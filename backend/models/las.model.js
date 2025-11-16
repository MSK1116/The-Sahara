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
  totalDebtor: { type: Number, default: 0 },
  totalFamily: { type: Number, default: 0 },
});

const Table4Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    province: { type: String, default: "" },
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
    province: { type: String, default: "" },
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
  },
  { _id: false }
);

const LASchema = new mongoose.Schema(
  {
    address: {
      permanent: { type: AddressSchema, default: () => ({}) },
      current: { type: AddressSchema, default: () => ({}) },
    },

    projectAddress: { type: AddressSchema, default: () => ({}) },

    table1: { type: [Table1Schema], default: [] },

    table2: { type: [Table2Schema], default: [] },

    approverAddress: { type: AddressSchema, default: () => ({}) },

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
    personal_education: { type: String, default: "" },

    applicant_name: { type: String, default: "" },
    age: { type: String, default: "" },

    phone1: { type: String, default: "" },
    phone2: { type: String, default: "" },

    citizenship_number: { type: String, default: "" },
    approver_applicant_name: { type: String, default: "" },
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

    LMSIN: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.LAS || mongoose.model("LAS", LASchema);
