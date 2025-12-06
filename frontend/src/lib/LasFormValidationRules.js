export const validationRules = {
  1: [
    // address permanentOld
    {
      field: "address.permanentOld",
      message: "स्थायी ठेगाना (ना.प्र.प) अनुसार जिल्ला, पालिका, वा वडा आवश्यक छ. (Form 1, Page 1, Section 3)",
      validate: (d) => {
        const f = d.form1;
        const addr = f.address?.permanentOld;
        if (!addr) return false;
        if (addr.district && addr.palika && addr.wada) {
          return true;
        }
        return false;
      },
    },
    // address permanent
    {
      field: "address.permanent",
      message: "हालको ठेगाना अनुसार प्रदेश, जिल्ला, पालिका, वा वडा आवश्यक छ. (Form 1, Page 1, Section 3)",
      validate: (d) => {
        const f = d.form1;
        const addr = f.address?.permanent;
        if (!addr) return false;
        if (addr.province && addr.district && addr.palika && addr.wada) {
          return true;
        }
        return false;
      },
    },
    // table2
    {
      field: "table2",
      message: "कृपया परिवारका सबै सदस्यको विवरण भर्नुहोस्. (Form 1, Page 2, Section 1)",
      validate: (d) => {
        const f = d.form1;
        const table2 = f.table2;
        if (!table2 || !Array.isArray(table2) || table2.length === 0) return false;

        // Loop through each member
        for (let member of table2) {
          // Validate name
          if (!member.name || !member.name.trim()) return false;

          // Validate education
          if (!member.education || !member.education.trim()) return false;

          // Validate profession
          if (!member.profession || !member.profession.trim()) return false;

          // Validate citizenship number
          if (!member.citizenship_number || !member.citizenship_number.trim()) return false;
        }

        return true;
      },
    },
    // address of approver permanentOld
    {
      field: "approverAddress.permanentOld",
      message: "मन्जुरीनामा दिनेका स्थायी ठेगाना (ना.प्र.प) अनुसार जिल्ला, पालिका, वा वडा आवश्यक छ. (Form 1, Page 2, Section 2)",
      validate: (d) => {
        const f = d.form1;

        // Only validate if approver_applicant_name is present
        if (!f.approver_applicant_name || !f.approver_applicant_name.trim()) return true;

        const addr = f.approverAddress?.permanentOld;
        if (!addr) return false;
        if (addr.district && addr.palika && addr.wada) {
          return true;
        }
        return false;
      },
    },
    // address of approver permanent
    {
      field: "approverAddress.permanent",
      message: "मन्जुरीनामा दिनेका हालको ठेगाना अनुसार प्रदेश, जिल्ला, पालिका, वा वडा आवश्यक छ. (Form 1, Page 2, Section 2)",
      validate: (d) => {
        const f = d.form1;

        // Only validate if approver_applicant_name is present
        if (!f.approver_applicant_name || !f.approver_applicant_name.trim()) return true;

        const addr = f.approverAddress?.permanent;
        if (!addr) return false;
        if (addr.province && addr.district && addr.palika && addr.wada) {
          return true;
        }
        return false;
      },
    },
    // table 7
    {
      field: "table7",
      message: "कृपया सम्पत्ति विवरणको सबै आवश्यक जानकारी भर्नुहोस्. (Form 1, Page 3, Section 1, Last Table)",
      validate: (d) => {
        const f = d.form1;
        const table7 = f.table7;
        if (!table7 || !Array.isArray(table7) || table7.length === 0) return false;

        for (let land of table7) {
          // Validate owner name
          if (!land.ownerName || !land.ownerName.trim()) return false;

          // Validate district, palika, wardNo
          if (!land.district || !land.palika || !land.wardNo) return false;

          // Validate plotNo and area
          if (!land.plotNo || !land.plotNo.trim()) return false;
          if (!land.area || !land.area.trim()) return false;
        }

        return true;
      },
    },
  ],

  2: [
    {
      field: "form2.evaluatorName",
      message: "मूल्यांकन गर्नेको नाम आवश्यक छ। (Form 2, Page 1, Section 1)",
      validate: (d) => !!d.form2?.evaluatorName,
    },
    {
      field: "form2.evaluatorPost",
      message: "मूल्यांकन गर्नेको पद आवश्यक छ। (Form 2, Page 1, Section 1)",
      validate: (d) => !!d.form2?.evaluatorPost,
    },
    {
      field: "form2.evaluationDate",
      message: "मूल्यांकन मिति आवश्यक छ। (Form 2, Page 1, Section 1)",
      validate: (d) => !!d.form2?.evaluationDate,
    },
    {
      field: "form2.fiftyPercentMargin",
      message: "सिफारिस रकम (५०% मार्जिन) आवश्यक छ। (Form 2, Page 1, Section 3)",
      validate: (d) => !!d.form2?.fiftyPercentMargin,
    },
    {
      field: "form2.fiftyPercentMargin_text",
      message: "सिफारिस रकम अक्षरेपी आवश्यक छ। (Form 2, Page 1, Section 3)",
      validate: (d) => !!d.form2?.fiftyPercentMargin_text,
    },
    {
      field: "table7",
      message: "जग्गाको किसिम, चलन चल्तीको मूल्य प्रतिकठ्ठा, नेपाल सरकार वा निकायले तोकेको मूल्य प्रतिकठ्ठा (सबै) जानकारी भर्नुहोस्. (Form 2, Page 1, Section 2)",
      validate: (d) => {
        const f = d.form1;
        const table7 = f.table7;
        if (!table7 || !Array.isArray(table7) || table7.length === 0) return false;

        for (let land of table7) {
          if (!land.govApprovedPrice) return false;
          if (!land.localApprovedPrice) return false;
          if (!land.landType || !land.landType.trim()) return false;
        }

        return true;
      },
    },
  ],

  5: [
    {
      field: "form4.annualInterestRate",
      message: "ऋणको बार्षिक पर्तिसत आवश्यक छ। (Form 4, Page 1, Section 1)",
      validate: (d) => !!d.form4?.annualInterestRate,
    },
    {
      field: "form4.addPer1",
      message: "तोकेको थप समयमा व्याज नबुझाएमा थप % आवश्यक छ। (Form 4, Page 1, Section 1)",
      validate: (d) => !!d.form4?.addPer1,
    },
    {
      field: "form4.addPer2",
      message: "तोकेको समयमा किस्ता तथा साँवा नबुझाएमा थप % आवश्यक छ। (Form 4, Page 1, Section 1)",
      validate: (d) => !!d.form4?.addPer2,
    },
    {
      field: "form4.malpotOfficeReplyPageNo",
      message: "मालपोत कार्यालयबाट प्राप्त पत्रको पृष्ठ नं. आवश्यक छ। (Form 4, Page 1, Section 2)",
      validate: (d) => !!d.form4?.malpotOfficeReplyPageNo,
    },
    {
      field: "form4.malpotOfficeReplyDate",
      message: "मालपोत कार्यालयबाट प्राप्त पत्र मिति आवश्यक छ। (Form 4, Page 1, Section 2)",
      validate: (d) => !!d.form4?.malpotOfficeReplyDate,
    },
    {
      field: "form4.malpotOfficeReplyChalaniNo",
      message: "मालपोत कार्यालयबाट प्राप्त पत्र च.नं. आवश्यक छ। (Form 4, Page 1, Section 2)",
      validate: (d) => !!d.form4?.malpotOfficeReplyChalaniNo,
    },
  ],
};
