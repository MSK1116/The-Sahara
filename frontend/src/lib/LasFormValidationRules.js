export const validationRules = {
  1: [
    // address permanentOld
    {
      field: "address.permanentOld",
      message: "स्थायी ठेगाना (ना.प्र.प) अनुसार जिल्ला, पालिका, वा वडा आवश्यक छ. (Page 1, Section 3)",
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
      message: "हालको ठेगाना अनुसार प्रदेश, जिल्ला, पालिका, वा वडा आवश्यक छ. (Page 1, Section 3)",
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
    // table1
    {
      field: "table1.भुक्तानी_अवधि",
      message: "भुक्तानी अवधि भर्न आवश्यक छ. (Page 1, Section 3)",
      validate: (d) => {
        const f = d.form1;
        const table1 = f.table1;
        if (!table1) return false;
        if (table1["भुक्तानी अवधि"]) {
          return true;
        }
        return false;
      },
    },
    // table2
    {
      field: "table2",
      message: "कृपया परिवारका सबै सदस्यको विवरण भर्नुहोस्. (Page 2, Section 1)",
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
      message: "मन्जुरीनामा दिनेका स्थायी ठेगाना (ना.प्र.प) अनुसार जिल्ला, पालिका, वा वडा आवश्यक छ. (Page 2, Section 2)",
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
      message: "मन्जुरीनामा दिनेका हालको ठेगाना अनुसार प्रदेश, जिल्ला, पालिका, वा वडा आवश्यक छ. (Page 2, Section 2)",
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
    {
      field: "table7",
      message: "कृपया सम्पत्ति विवरणको सबै आवश्यक जानकारी भर्नुहोस्. (Page 3, Section 1, Last Table)",
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
};
