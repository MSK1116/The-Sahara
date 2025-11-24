import convert from "number-to-nepali-words";
export function PageMaker_LoanApplicationPage1(data) {
  const f = data.form1;
  console.log(f);
  let applicantDetails = "";
  const isPerson = f.applicantType !== "सहारा ब्यापारिक कर्जा";
  if (!isPerson && convert(f.amount || "", "toEn") > 300000) {
    applicantDetails = `
      <p class="mt-2">ऋण निवेदकको प्रकार: <b>${f.applicantType}</b></p>
      <p>फर्म/कम्पनीको नाम: <b>${f.companyName}</b>, शेयर सदस्यता नं: <b>${f.company_shareholderNumber}</b>, रजिष्ट्रेशन कार्यालयको नाम: <b>${f.registrationOffice}</b></p>
      <p>रजिष्ट्रेशन नं: <b>${f.registrationNumber}</b>, मिति: <b>${f.registrationDate}</b>, आयकर पान नं (PAN): <b>${f.panNumber}</b>, मिति: <b>${f.panDate}</b></p>
      <p>व्यापारको प्रकार: <b>${f.businessType || "—"}</b></p>
      <p>परियोजना स्थल: <b>${f.projectLocation || "—"}</b></p>
      <p>परियोजनाको अनुमानित कुल लागत: <b>${f.projectCost || "—"}/-</b></p>
    `;
  } else {
    applicantDetails = `<p>ऋण निवेदकको प्रकार: <b>${f.applicantType}</b></p>
        <p>खाता नं. ${f.savingsAccountNumber || ""}<b> </b></p>
                <p>सेयर नं. ${f.company_shareholderNumber || ""}<b> </b></p>

    `;
  }

  // Generate relatives table HTML with structured address
  const relativesTable = f.table2 && f.table2.length > 0 ? f.table2 : [{}]; // if table is empty, create one empty row

  const relativesTableHTML = `
<p>सगोलमा रहेको नातेदारहरुको विवरण:</p>
<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
  <thead>
    <tr>
      <th>सि.न</th>
      <th>नाम</th>
      <th>ठेगाना</th>
      <th>नाता</th>
      <th>उमेर</th>
      <th>शैक्षिक योग्यता</th>
      <th>पेसा</th>
    </tr>
  </thead>
  <tbody>
    ${relativesTable
      .map(
        (row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${row.name || ""}</td>
        <td>
          ${row.address ? `${row.address.province || ""}, ${row.address.district || ""}, ${row.address.palika || ""}, ${convert(row.address.wada || "1", "toNp")}, ${row.address.tole || ""}` : ""}
        </td>
        <td>${row.relation || ""}</td>
        <td>${row.age || ""}</td>
        <td>${row.education || ""}</td>
        <td>${row.profession || ""}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`;

  // Approver section
  const approverSection = f.approver_applicant_name
    ? `
  <div class="mt-5">
    <p class="font-bold my-2">धितो मन्जुरीनामा दिनेको व्यक्तिगत विवरण:</p>
    <p>नाम: <b>${f.approver_applicant_name}</b></p>
    <p>स्थायी ठेगाना (ना.प्र.प) अनुसार :  
      जिल्ला <b>${f.approverAddress.permanentOld.district}</b>, 
      गा.वि .स/ना.पा <b>${f.approverAddress.permanentOld.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.approverAddress.permanentOld.wada || "1", "toNp")}</b>, 
      टोल <b>${f.approverAddress.permanentOld.tole || "—"}</b>
    </p>
    
    <p>नागरिकता न: <b>${f.approver_citizenship_number || "—"}</b></p>
    <p>बुबाको नाम: <b>${f.approver_father_name || "—"}</b></p>
    <p>पतिको/पत्नीको नाम: <b>${f.approver_spouse_name || "—"}</b></p>
    <p>बाजे/ससुरको नाम: <b>${f.approver_inlaws_name || "—"}</b></p>
    <p>सगोलमा रहेको नातेदारहरुको विवरण: <b>${f.approver_families_details || "—"}</b></p>
  </div>
  `
    : "";

  const approverSection2 = f.approver_applicant_name
    ? `
    <td class="align-top w-1/2 border px-4 py-2">
      <p class="font-semibold mb-3">मञ्जुरी दिने व्यक्ति:</p>

      <p>हस्ताक्षर: ___________________</p>

      <p>
        नाम:
        <b>${f.approver_applicant_name}</b>
      </p>

      <p>स्थायी ठेगाना (ना.प्र.प) अनुसार :  
      जिल्ला <b>${f.approverAddress.permanentOld.district}</b>, 
      गा.वि .स/ना.पा <b>${f.approverAddress.permanentOld.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.approverAddress.permanentOld.wada || "1", "toNp")}</b>, 
      टोल <b>${f.approverAddress.permanentOld.tole || "—"}</b>
      </p>
    </td>
    `
    : "";

  // Income Table (Table-3)
  const incomeTable =
    f.table3 && f.table3.rows && f.table3.rows.length > 0
      ? `
    <p class="font-bold my-3">ऋणीको वार्षिक आम्दानी र एकाघर परिवारको वार्षिक आय :-</p>

    <table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
      <thead>
        <tr>
          <th>सि.न</th>
          <th>शीर्षक</th>
          <th>ऋणीको वार्षिक आम्दानी</th>
          <th>एकाघर परिवारको वार्षिक आय</th>
          <th>कैफियत</th>
        </tr>
      </thead>
      <tbody>
        ${f.table3.rows
          .map(
            (row, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${row.title || "—"}</td>
            <td>${row.debtorIncome && row.debtorIncome !== "" ? row.debtorIncome : "0"}/-</td>
            <td>${row.familyAnnualIncome && row.familyAnnualIncome !== "" ? row.familyAnnualIncome : "0"}/-</td>
            <td>${row.notes || ""}</td>
          </tr>
        `
          )
          .join("")}

        <tr style="font-weight: bold; background: #eee;">
          <td colspan="2" style="text-align:right;">जम्मा (Total)</td>
          <td>${f.table3.totalDebtor || 0}/-</td>
          <td>${f.table3.totalFamily || 0}/-</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  `
      : "";

  const table4Row = f.table4 && f.table4.length > 0 ? f.table4 : [{}];
  const table5Row = f.table5 && f.table5.length > 0 ? f.table5 : [{}];
  const table6Row = f.table6 && f.table6.length > 0 ? f.table6 : [{}];
  const table7Row = f.table7 && f.table7.length > 0 ? f.table7 : [{}];

  const table4HTML = `
<p class="font-bold my-3">ऋणीको एकल परिवारको अचल सम्पत्तिको विनियोजन :-</p>

<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
  <thead>
    <tr>
      <th>सि.न</th>
      <th>धनीको नाम</th>
      <th>जिल्ला</th>
      <th>गा.वि.स. / न.पा. </th>
      <th>वडा न.</th>
      <th>सि.न</th>
      <th>कि.न</th>
      <th>क्षेत्रफल</th>
      <th>कैफियत</th>
    </tr>
  </thead>
  <tbody>
    ${table4Row
      .map(
        (row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${f.applicant_name || ""}</td>
        <td>${row.province || ""}</td>
        <td>${row.district || ""}</td>
        <td>${row.palika || ""}</td>
        <td>${row.wardNo || ""}</td>
        <td>${row.serialNo || ""}</td>
        <td>${row.plotNo || ""}</td>
        <td class="text-nowrap whitespace-nowrap">${row.area || ""}</td>
        <td>${row.remarks || ""}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`;

  const table5HTML = `
<p class="font-bold my-3">ऋणी वा परिवारले अन्य बैंक/वित्तीय संस्थाबाट गरेको कारोबार :-</p>

<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
  <thead>
    <tr>
      <th>सि.न</th>
      <th>ऋणीको नाम</th>
      <th>बैंकको नाम</th>
      <th>कर्जा सुविधा</th>
      <th>स्वीकृत रकम</th>
      <th>तिर्न बाँकी रकम</th>
      <th>कैफियत</th>
    </tr>
  </thead>
  <tbody>
    ${table5Row
      .map(
        (row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${row.borrowerName ? (typeof row.borrowerName === "object" ? Object.values(row.borrowerName).join(" ") : row.borrowerName) : ""}</td>
        <td>${row.bankName || ""}</td>
        <td>${row.loanType || ""}</td>
        <td>${row.approvedAmount || ""}</td>
        <td>${row.remainingAmount || ""}</td>
        <td>${row.remarks || ""}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`;

  const table6HTML = `
<p class="font-bold my-3">ऋणी वा परिवारले यस संस्थाबाट गरेको कारोबार :-</p>

<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
  <thead>
    <tr>
      <th>सि.न</th>
      <th>ऋणीको नाम</th>
      <th>कर्जा नं</th>
      <th>मि न.</th>
      <th>स्वीकृत रकम</th>
      <th>तिर्न बाँकी रकम</th>
      <th>कारोबार सुरु गरेको मिति</th>
      <th>कैफियत</th>
    </tr>
  </thead>
  <tbody>
    ${table6Row
      .map(
        (row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${row.borrowerName ? (typeof row.borrowerName === "object" ? Object.values(row.borrowerName).join(" ") : row.borrowerName) : ""}</td>
        <td>${row.loanNo || ""}</td>
        <td>${row.miNo || ""}</td>
        <td>${row.approvedAmount || ""}</td>
        <td>${row.remainingAmount || ""}</td>
        <td>${row.startDate || ""}</td>
        <td>${row.remarks || ""}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`;

  const table7HTML = `
<p class="font-bold my-3">धितोको विवरण :-</p>

<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
  <thead>
    <tr>
      <th>सि.न</th>
      <th>धनीको नाम</th>
      <th>जिल्ला</th>
      <th>गा.वि.स. / न.पा.</th>
      <th>वडा नं</th>
      <th>टोल / बाटो</th>
      <th>सि.न</th>
      <th>कि.न</th>
      <th>क्षेत्रफल</th>
      <th>चार किला</th>
      <th>अनुमानित मूल्य</th>
      <th>कैफियत</th>
    </tr>
  </thead>
  <tbody>
    ${table7Row
      .map(
        (row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${row.ownerName || ""}</td>
        <td>${row.district || ""}</td>
        <td>${row.palika || ""}</td>
        <td>${convert(row.wardNo || "", "toNp")}</td>
        <td>${row.tole || ""}</td>
        <td>${row.sheetNo || ""}</td>
        <td>${row.plotNo || ""}</td>
        <td class="text-nowrap whitespace-nowrap" >${row.area || ""}</td>
        <td>${row.charKila || ""}</td>
        <td>${row.estimatedValue || ""}</td>
        <td>${row.remarks || ""}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`;

  return `<body>
    <div class="flex relative flex-row justify-center items-center">
        <div class="absolute left-2 top-2 mr-10 size-20">
            <img class="rounded-full" src="/image_dir/LogoOnly.png" alt="Logo" />
        </div>
        <div class="">
            <h1 class="text-xs mt-5 text-center">सहकारी ऐन २०४८ बमोजिम स्थापित</h1>
            <h2 class="font-bold text-center mt-1 tracking-widest">द सहारा लोन सेविग्स को अपरेटिभ सोसाइटी लिमिटेड</h2>
            <h3 class="text-sm text-center">रजिष्टर्ड प्रधान कार्यालय मलंगवा, सर्लाही(नेपाल)</h3>
            <h3 class="text-sm text-center">${f.branchType || "_"}:- ${f.branch || ""}</h3>
            <h4 class="mt-5 mb-2 underline text-center">Loan Application</h4>
        </div>
    </div>

    <hr>
    <div class="flex items-center text-xs mt-1 justify-between flex-row">
        <h5>ऋण माग पत्र दर्ता संख्या: <b>-</b></h5>
        <h5>ऋण भाग पत्र दर्ता मिति: <b>-</b></h5>
        <h5>ऋण संख्या: <b>-</b></h5>
        <h5>दर्ता गर्नेको दस्तखत: <b>-</b></h5>
    </div>

    <h2 class="mt-5 mb-0.5">श्रीमान् कार्यालय प्रमुख ज्यु</h2>
    <h3 class="my-1">द सहारा लोन सेविम्स को अपरेटिभ सोसाइटी लिमिटेड</h3>
    <h4 class="my-1">प्रधान कार्यालय मलंगवा</h4>
    <h5 class="my-1">${f.branchType}: <b>${f.branch || "-"}</b></h5>

    <p class="my-1 mb-2">
      कृपया निम्न विवरण खुलाइ म/हामीले <b>${f.desc1}</b> कार्यको लागि माग गरेको रु 
      <b>${f.amount}/-</b> अक्षरमा रु <b>${f.amount_text} मात्र /-</b> को सुविधा स्वीकृत गरी दिनु हुन अनुरोध गर्दछु/छौं।
    </p>

    <p>ऋण निवेदकको नाम थर: <b>${f.applicant_name}</b></p>
    <p>उमेर: <b>${convert(f.age || "", "toNp")}</b></p>

    <p>
      स्थायी ठेगाना (ना.प्र.प) अनुसार :  
      जिल्ला <b>${f.address.permanentOld.district}</b>, 
      गा.वि .स/ना.पा <b>${f.address.permanentOld.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.address.permanentOld.wada || "1", "toNp")}</b>, 
      टोल <b>${f.address.permanentOld.tole || "—"}</b>
      र हाल ठेगाना:
      <b>${f.address.permanent.province}</b>, 
      जिल्ला <b>${f.address.permanent.district}</b>, 
      गा.पा / ना.पा. <b>${f.address.permanent.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.address.permanent.wada || "1", "toNp")}</b>, 
      टोल <b>${f.address.permanent.tole || "—"}</b>
    </p>

    <h2>फोन नं: <b>${convert(f.phone1 || "", "toNp")}</b>, <b>${convert(f.phone2 || "", "toNp")}</b></h2>
    <h3>शैक्षिक योग्यता: <b>${f.personal_education}</b></h3>

    ${applicantDetails}

    <div class="mt-2 mb-1">माग  गरेको ऋण सुविधा</div>
    <table border="1" class="text-xs my-3" cellspacing="0" cellpadding="6" width="100%">
        <tr>
            <th>क्र.स</th>
            <th>कर्जा सुविधा</th>
            <th>रकम</th>
            <th>भुक्तानी अवधि</th>
            <th>कैफियत</th>
        </tr>
        ${f.table1
          .map(
            (row, index) => `
        <tr>
            <td><b>${convert(index + 1 || "", "toNp")}</b></td>
            <td><b>${f.applicantType || "—"}</b></td>
            <td><b>${f.amount || "—"}</b></td>
            <td><b>${convert(row["भुक्तानी अवधि"] || "—", "toNp")} वर्ष</b></td>
            <td><b>${row["कैफियत"] || "—"}</b></td>
        </tr>`
          )
          .join("")}
    </table>

    <p>व्याज बुझाउने: <b>${f.paymentFrequency}</b></p>

    <p class="mt-2">
      <b>ऋणीको व्यक्तिगत विवरण:</b> <br/>
      नाम: <b>${f.applicant_name}</b>, <br/>
      ठेगाना: <b>${f.address.permanent.province}, ${f.address.permanent.district}, ${f.address.permanent.palika}, ${convert(f.address.permanent.wada || "1", "toNp")}, ${f.address.permanent.tole}</b>
    </p>

    <p>
      नागरिकता नं.: <b>${f.citizenship_number}</b>, <br/>
      बुबाको नाम: <b>${f.applicant_father_name}</b>, <br/>
      पतिको/पत्नीको नाम: <b>${f.applicant_spouse_name}</b>, <br/>
      बाजे/ससुरको नाम: <b>${f.applicant_inlaws_name}</b>
    </p>

    ${relativesTableHTML}
   
    ${approverSection}

    <p>ऋणीको पेशा: <b>${f.applicant_profession}</b></P>

    ${incomeTable}

    ${table4HTML}

    ${table5HTML}
    ${table6HTML}
    ${table7HTML}

    <p class="my-3">माथि उल्लेखित सम्पूर्ण विवरण मैले उपलब्ध गराएको सत्य र साँचो हो । यसमा फरक परे म पूर्ण रूपमा जिम्मेवार हुनेछु । साथै, संस्थाले समय, परिस्थिति तथा अन्य कारणवश कुनै नियम, ब्याज दर तथा अन्य नीति–नियम परिवर्तन गरेमा मलाई मन्जुर हुनेछ ।</p>
 
  
   <table class="w-full border-collapse my-5 text-xs">
  <tr>
    <!-- Applicant -->
    <td class="align-top w-1/2 border px-4 py-2">
      <p class="font-semibold mb-3">निवेदक:</p>

      <p>हस्ताक्षर: ___________________</p>

      <p>
        नाम: <b>${f.applicant_name}</b>
      </p>

       <p>स्थायी ठेगाना (ना.प्र.प) अनुसार :  
      जिल्ला <b>${f.approverAddress.permanentOld.district}</b>, 
      गा.वि .स/ना.पा <b>${f.approverAddress.permanentOld.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.approverAddress.permanentOld.wada || "1", "toNp")}</b>, 
      टोल <b>${f.approverAddress.permanentOld.tole || "—"}</b>
      </p>
    </td>

    <!-- Approver -->
    ${approverSection2}
  </tr>
</table>


    <script>
      window.onload = () => { window.print(); };
    </script>

</body>`;
}
