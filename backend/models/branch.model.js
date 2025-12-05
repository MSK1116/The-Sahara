import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  nameNp: {
    type: String,
    required: true,
  },
  nameEn: { type: String, required: true },
  employeeId: { type: String, default: `${Math.random().toString(36).slice(2, 10)}` },
});

const branchSchema = new mongoose.Schema({
  nameEn: {
    type: String,
    required: true,
  },
  nameNp: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  databaseSlug: { type: String, required: true },
  branchCode: {
    type: String,
    required: true,
  },
  branchType: {
    type: String,
    required: true,
  },
  employee: [employeeSchema],
});

const Branch = mongoose.models.Branch || mongoose.model("Branch", branchSchema);
export default Branch;
