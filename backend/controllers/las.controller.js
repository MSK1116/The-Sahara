// controllers/laController.js
import mongoose from "mongoose";
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
    ];

    for (const [path, message] of requiredFields) {
      if (!get(data, path)) {
        return res.status(400).json({ message });
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
        createdAt: 1,
        updatedAt: 1,
        _id: 0,
      }
    ).sort({ updatedAt: -1 });

    const result = docs.map((doc) => ({
      LMSIN: doc.LMSIN,
      citizenship_number: doc.form1?.citizenship_number || "",
      applicant_name: doc.form1?.applicant_name || "",
      createdAgo: doc.createdAt,
      updatedAgo: doc.updatedAt,
    }));

    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const getOfficers = async (req, res) => {
  const { databaseSlug } = req.body;
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

export const addOfficer = async (req, res) => {
  const { post, nameNp, nameEn, databaseSlug } = req.body;

  if (!post || !nameNp || !nameEn) {
    return res.status(400).json({ message: "All employee fields are required." });
  }

  try {
    const branch = await Branch.findOne({ databaseSlug });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found." });
    }

    const newEmployee = { post, nameNp, nameEn };
    branch.employee.push(newEmployee);

    await branch.save();
    return res.status(200).json({ message: "Employee added successfully", branch });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const removeOfficer = async (req, res) => {
  const { nameEn, _id, databaseSlug } = req.body;

  if (!nameEn || !_id || !databaseSlug) {
    return res.status(400).json({ message: "nameEn, _id, and databaseSlug are required." });
  }

  try {
    const branch = await Branch.findOne({ databaseSlug });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found." });
    }

    const emp = branch.employee.id(_id);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found." });
    }

    if (emp.nameEn !== nameEn) {
      return res.status(400).json({ message: "Employee name does not match." });
    }

    emp.deleteOne();
    await branch.save();

    return res.status(200).json({ message: "Employee removed successfully." });
  } catch (error) {
    console.error("Error removing employee:", error);
    return res.status(500).json({ message: "Internal server error." });
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

export const getAllBranchSlugs = async (req, res) => {
  try {
    const slugs = await Branch.find({}, { databaseSlug: 1, _id: 0 });

    if (!slugs || slugs.length === 0) {
      return res.status(404).json({ slugs: [] });
    }
    const result = slugs.map((b) => b.databaseSlug);

    return res.status(200).json({ slugs: result });
  } catch (error) {
    console.error("Error fetching branch slugs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const transferEmployee = async (req, res) => {
  const { sourceBranchCode, targetBranchCode, employeeId } = req.body;

  if (!sourceBranchCode || !targetBranchCode || !employeeId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (sourceBranchCode === targetBranchCode) {
    return res.status(400).json({ message: "Source and target branch cannot be the same." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sourceBranch = await Branch.findOne({ branchCode: sourceBranchCode }).session(session);
    if (!sourceBranch) throw new Error("Source branch not found");

    const employeeIndex = sourceBranch.employee.findIndex((e) => e._id.toString() === employeeId);
    if (employeeIndex === -1) throw new Error("Employee not found in source branch");

    const [employeeToTransfer] = sourceBranch.employee.splice(employeeIndex, 1);
    await sourceBranch.save({ session });

    const targetBranch = await Branch.findOne({ branchCode: targetBranchCode }).session(session);
    if (!targetBranch) throw new Error("Target branch not found");

    targetBranch.employee.unshift(employeeToTransfer);
    await targetBranch.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Employee transferred successfully." });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transfer error:", error);

    // Retry if transient error
    if (error.errorLabels?.includes("TransientTransactionError")) {
      return res.status(500).json({ message: "Write conflict occurred. Please retry the operation." });
    }

    return res.status(500).json({ message: "Server error during transfer." });
  }
};
