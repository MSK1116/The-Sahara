import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  province: { type: String, default: "" },
  district: { type: String, default: "" },
  palika: { type: String, default: "" },
  wada: { type: String, default: "" },
  tole: { type: String, default: "" },
});

const Table1Schema = new mongoose.Schema({
  "भुक्तानी अवधि": { type: String, default: "" },
  कैफियत: { type: String, default: "" },
});

const Table2Schema = new mongoose.Schema({
  id: Number,
  name: { type: String, default: "" },
  address: { type: AddressSchema, default: () => ({}) },
  relation: { type: String, default: "" },
  age: { type: String, default: "" },
  education: { type: String, default: "" },
  profession: { type: String, default: "" },
  citizenship_number: { type: String, default: "" },
});

const Table3RowSchema = new mongoose.Schema({
  id: Number,
  title: String,
  debtorIncome: { type: String, default: "" },
  familyAnnualIncome: { type: String, default: "" },
  notes: { type: String, default: "" },
});

const Table3Schema = new mongoose.Schema({
  rows: { type: [Table3RowSchema], default: [] },
  totalDebtor: { type: String, default: "" },
  totalFamily: { type: String, default: "" },
});

const Table4Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    district: { type: String, default: "" },
    palika: { type: String, default: "" },
    wardNo: { type: String, default: "" },
    sheetNo: { type: String, default: "" },
    plotNo: { type: String, default: "" },
    area: { type: String, default: "" },
    remarks: { type: String, default: "" },
  },
  { _id: false }
);

const Table5Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    borrowerName: { type: String, default: "" },
    bankName: { type: String, default: "" },
    loanType: { type: String, default: "" },
    approvedAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: 0 },
    remarks: { type: String, default: "" },
  },
  { _id: false }
);

const Table6Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    borrowerName: { type: String, default: "" },
    loanNo: { type: String, default: "" },
    miNo: { type: String, default: "" },
    approvedAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: 0 },
    startDate: { type: String, default: "" },
    remarks: { type: String, default: "" },
  },
  { _id: false }
);

const Table7Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    ownerName: { type: String, default: "" },
    district: { type: String, default: "" },
    palika: { type: String, default: "" },
    wardNo: { type: String, default: "" },
    tole: { type: String, default: "" },
    sheetNo: { type: String, default: "" },
    plotNo: { type: String, default: "" },
    area: { type: String, default: "" },
    charKila: { type: String, default: "" },
    estimatedValue: { type: Number, default: 0 },
    remarks: { type: String, default: "" },
    govApprovedPrice: { type: Number, default: "" },
    localApprovedPrice: { type: Number, default: "" },
  },
  { _id: false }
);

const Form1Schema = new mongoose.Schema({
  address: {
    permanentOld: { type: AddressSchema, default: () => ({}) },
    permanent: { type: AddressSchema, default: () => ({}) },
    current: { type: AddressSchema, default: () => ({}) },
  },

  projectAddress: { type: AddressSchema, default: () => ({}) },

  table1: { type: [Table1Schema], default: [] },
  table2: { type: [Table2Schema], default: [] },

  approverAddress: {
    permanentOld: { type: AddressSchema, default: () => ({}) },
    permanent: { type: AddressSchema, default: () => ({}) },
    current: { type: AddressSchema, default: () => ({}) },
  },

  table3: { type: Table3Schema, default: () => ({}) },

  table4: { type: [Table4Schema], default: [] },
  table5: { type: [Table5Schema], default: [] },
  table6: { type: [Table6Schema], default: [] },
  table7: { type: [Table7Schema], default: [] },

  rn1: { type: String, default: "" },
  rn2: { type: String, default: "" },
  rn3: { type: String, default: "" },
  rn4: { type: String, default: "" },

  branch: { type: String, default: "" },

  desc1: { type: String, default: "" },
  amount: { type: String, default: "" },
  amount_text: { type: String, default: "" },
  personal_education: { type: String, default: "" },

  applicant_name: { type: String, default: "" },
  age: { type: String, default: "" },
  applicant_gender: { type: String, default: "male" },
  applicant_maritalStatus: { type: String, default: "single" },

  phone1: { type: String, default: "" },
  phone2: { type: String, default: "" },

  citizenship_number: { type: String, default: "" },
  citizenship_takenOffice: { type: String, default: "" },
  citizenship_takenDate: { type: String, default: "" },

  approver_applicant_name: { type: String, default: "" },
  approver_citizenship_number: { type: String, default: "" },
  approver_father_name: { type: String, default: "" },
  approver_inlaws_name: { type: String, default: "" },
  approver_spouse_name: { type: String, default: "" },
  approver_families_detail: { type: String, default: "" },

  applicant_father_name: { type: String, default: "" },
  applicant_spouse_name: { type: String, default: "" },
  applicant_inlaws_name: { type: String, default: "" },
  applicant_profession: { type: String, default: "" },

  applicantType: { type: String, default: "व्यक्ति" },

  companyName: { type: String, default: "" },
  company_shareholderNumber: { type: String, default: "" },
  company_registrationOffice: { type: String, default: "" },
  savingsAccountNumber: { type: String, default: "" },
  company_registrationNumber: { type: String, default: "" },
  company_registrationDate: { type: String, default: "" },
  panNumber: { type: String, default: "" },
  panDate: { type: String, default: "" },
  business_type: { type: String, default: "" },
  project_estimated_cost: { type: String, default: "" },
  project_estimated_cost_text: { type: String, default: "" },

  paymentFrequency: { type: String, default: "मासिक" },
});

const Form2Schema = new mongoose.Schema({
  evaluatorName: { type: String, default: "" },
  evaluatorPost: { type: String, default: "" },
  evaluationDate: { type: String, default: "" },
  fiftyPercentMargin: { type: String, default: "" },
  fiftyPercentMargin_text: { type: String, default: "" },
});

const Form3Schema = new mongoose.Schema({
  branchType: { type: String, default: "साखा कार्यालय" },
  branchCode: { type: String, default: "" },
  malpotLetterNo: { type: String, default: "" },
  malpotLetterChalaniNo: { type: String, default: "" },
  malpotLetterDate: { type: String, default: "" },
  malpotOfficeName: { type: String, default: "" },
  malpotOfficerName: { type: String, default: "" },
});

const WitnessSchema = new mongoose.Schema(
  {
    district: { type: String, default: "" },
    palika: { type: String, default: "" },
    ward: { type: String, default: "" },
    name: { type: String, default: "" },
  },
  { _id: false }
);

const Form4Schema = new mongoose.Schema({
  annualInterestRate: { type: String, default: "" },
  addPer1: { type: String, default: "" },
  addPer2: { type: String, default: "" },
  malpotOfficeReplyDate: { type: String, default: "" },
  malpotOfficeReplyChalaniNo: { type: String, default: "" },
  malpotOfficeReplyPageNo: { type: String, default: "" },
  witness1: { type: WitnessSchema, default: () => ({}) },
  witness2: { type: WitnessSchema, default: () => ({}) },
  maker: { type: String, default: "" },
});

const LASchema = new mongoose.Schema(
  {
    LMSIN: { type: String, unique: true },
    form1: { type: Form1Schema, default: () => ({}) },
    form2: { type: Form2Schema, default: () => ({}) },
    form3: { type: Form3Schema, default: () => ({}) },
    form4: { type: Form4Schema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.models.LAS || mongoose.model("LAS", LASchema);
