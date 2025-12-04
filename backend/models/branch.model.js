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
  employee: [employeeSchema],
});

const Branch = mongoose.models.Branch || mongoose.model("Branch", branchSchema);
export default Branch;
