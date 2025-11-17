// controllers/laController.js
import lasModel from "../models/las.model.js";
import { customAlphabet } from "nanoid";
export const upsertLAS = async (req, res) => {
  try {
    const data = req.body;

    if (!data.form1.citizenship_number) {
      return res.status(400).json({ message: "citizenship_number is required." });
    }

    if (!data.LMSIN) {
      return res.status(400).json({ message: "LMSIN is required." });
    }
    // Find existing record by citizenship_number
    const existingLA = await lasModel.findOne({ LMSIN: data.LMSIN });

    if (existingLA) {
      const updatedLAS = await lasModel.findByIdAndUpdate(existingLA._id, data, { new: true });
      return res.status(200).json({
        message: "Record updated successfully",
        data: updatedLAS,
      });
    } else {
      const newLAS = new lasModel(data);
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
  const { LMSIN } = req.body;

  if (!LMSIN) {
    return res.status(400).json({ error: "LMSIN is required" });
  }

  try {
    const applicant = await lasModel.findOne({ LMSIN: LMSIN });

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
    let lmsinNumber;
    let exists = true;
    let attempts = 0;
    const maxAttempts = 10;

    while (exists && attempts < maxAttempts) {
      lmsinNumber = `${nanoid().replace(/(\d{3})(\d{3})/, "$1-$2")}`;
      exists = await lasModel.findOne({ LMSIN: lmsinNumber });
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
