// controllers/laController.js
import Branch from "../models/branch.model.js";
import getLasModel from "../models/las.model.js";
import { customAlphabet } from "nanoid";

export const upsertLAS = async (req, res) => {
  try {
    // Destructure the suffix and the rest of the form data from the request body.
    const data = req.body;
    const { databaseSlug } = data;
    // Get the dynamic model. If no suffix is provided, it defaults to the "LAS" collection.
    const LasModel = getLasModel(databaseSlug);

    const get = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
    const requiredFields = [
      ["LMSIN", "LMSIN is required"],
      ["form1.citizenship_number", "Citizenship number is required"],
      ["form1.citizenship_takenOffice", "Office of citizenship is required"],
      ["form1.citizenship_takenDate", "Date of citizenship taken is required"],
      ["form1.phone1", "Phone-1 number is required"],
      ["form1.age", "Age is required"],
      ["form1.applicant_father_name", "Applicant father name is required"],
      ["form1.applicant_profession", "Applicant profession is required"],
      ["form1.savingsAccountNumber", "Applicant Saving Account No is required"],
      ["form1.company_shareholderNumber", "Applicant Shareholder No is required"],
      ["form1.personal_education", "Personal Education is required"],
      ["form1.address.permanentOld.district", "Old permanent district missing"],
      ["form1.address.permanentOld.palika", "Old permanent palika missing"],
      ["form1.address.permanentOld.wada", "Old permanent ward missing"],
      ["form1.address.permanent.district", "Permanent district missing"],
      ["form1.address.permanent.palika", "Permanent palika missing"],
      ["form1.address.permanent.wada", "Permanent ward missing"],
    ];

    for (const [path, message] of requiredFields) {
      if (!get(data, path)) {
        return res.status(400).json({ message });
      }
    }

    if (data.form1.approver_applicant_name) {
      if (!data.form1.approver_age) {
        return res.status(400).json({ message: "Approver Age is required" });
      }
      if (!data.form1.approver_citizenship_number) {
        return res.status(400).json({ message: "Approver Citizenship number is required" });
      }
      if (!data.form1.approver_citizenship_takenOffice) {
        return res.status(400).json({ message: "Approver Office of citizenship is required" });
      }
      if (!data.form1.approver_citizenship_takenDate) {
        return res.status(400).json({ message: "Approver Date of citizenship taken is required" });
      }

      if (!data.form1.approverAddress.permanentOld.district || !data.form1.approverAddress.permanentOld.palika || !data.form1.approverAddress.permanentOld.wada) {
        return res.status(400).json({ message: "Please check Approver applicant old permanent address" });
      }
      if (!data.form1.approverAddress.permanent.district || !data.form1.approverAddress.permanent.palika || !data.form1.approverAddress.permanent.wada) {
        return res.status(400).json({ message: "Please check Approver applicant permanent address" });
      }
      if (!data.form1.approver_father_name) {
        return res.status(400).json({ message: "Approver Applicant father name is required" });
      }
      if (!data.form1.approver_inlaws_name) {
        return res.status(400).json({ message: "Approver in-laws name is required" });
      }
      if (!data.form1.approver_spouse_name) {
        return res.status(400).json({ message: "Approver Applicant husband/wife name is required" });
      }
    }

    // Find existing record by citizenship_number
    const existingLA = await LasModel.findOne({ LMSIN: data.LMSIN });

    if (existingLA) {
      const updatedLAS = await LasModel.findByIdAndUpdate(existingLA._id, data, { new: true });
      return res.status(200).json({
        message: "Record updated successfully",
        data: updatedLAS,
      });
    } else {
      const newLAS = new LasModel(data);
      await newLAS.save();
      return res.status(201).json({
        message: "New record created successfully",
        data: newLAS,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const nanoid = customAlphabet("0123456789", 6);

export const getApplicant = async (req, res) => {
  // Expect LMSIN and branchName from the request body
  const { LMSIN, databaseSlug } = req.body;

  if (!LMSIN) {
    return res.status(400).json({ error: "LMSIN is required" });
  }

  try {
    // Get the dynamic model
    const LasModel = getLasModel(databaseSlug);
    const applicant = await LasModel.findOne({ LMSIN: LMSIN });

    if (!applicant) {
      return res.status(404).json({ error: "Applicant not found" });
    }
    res.status(200).json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getLMSIN = async (req, res) => {
  try {
    const { databaseSlug } = req.body;
    const LasModel = getLasModel(databaseSlug);
    let lmsinNumber;
    let exists = true;
    let attempts = 0;
    const maxAttempts = 10;

    while (exists && attempts < maxAttempts) {
      lmsinNumber = `${nanoid().replace(/(\d{3})(\d{3})/, "$1-$2")}`;
      exists = await LasModel.findOne({ LMSIN: lmsinNumber });
      attempts++;
    }

    if (exists) {
      return res.status(500).json({ error: "Could not generate unique LMSIN, try again" });
    }

    res.status(200).json({ lmsinNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getRecentHistory = async (req, res) => {
  const { databaseSlug, startDate, finishDate } = req.body;

  const start = startDate ? new Date(startDate) : new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const finish = finishDate ? new Date(finishDate) : new Date();

  start.setUTCHours(0, 0, 0, 0);
  finish.setUTCHours(23, 59, 59, 999);

  try {
    const LasModel = getLasModel(databaseSlug);
    const docs = await LasModel.find(
      {
        $or: [{ createdAt: { $gte: start, $lte: finish } }, { updatedAt: { $gte: start, $lte: finish } }],
      },
      {
        LMSIN: 1,
        "form1.citizenship_number": 1,
        "form1.applicant_name": 1,
        _id: 0,
      }
    ).sort({ updatedAt: -1 });

    const result = docs.map((doc) => ({
      LMSIN: doc.LMSIN,
      citizenship_number: doc.form1?.citizenship_number || "",
      applicant_name: doc.form1?.applicant_name || "",
    }));

    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const getOfficers = async (req, res) => {
  const { databaseSlug } = req.body;
  console.log(databaseSlug);
  try {
    const branchFetched = await Branch.findOne({ databaseSlug: databaseSlug }).lean();
    if (!branchFetched) {
      return res.status(400).json({ error: "Branch not found" });
    }
    return res.status(200).json({ employee: branchFetched.employee });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const getBranch = async (req, res) => {
  try {
    const fetchBranch = await Branch.find({}).lean();

    if (!fetchBranch) {
      return res.status(400).json({ error: "Something went wrong" });
    }
    return res.status(200).json({ fetchBranch });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
