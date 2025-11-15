export function PageMaker_LoanApplicationPage1(data) {
  const f = data;
  console.log(f);

  // Conditional content for applicant type
  let applicantDetails = "";
  if (f.applicantType === "व्यक्ति") {
    applicantDetails = `<p>ऋण निवेदकको प्रकार: <b>${f.applicantType}</b></p>`;
  } else {
    applicantDetails = `
      <p class="mt-2">ऋण निवेदकको प्रकार: <b>${f.applicantType}</b></p>
      <p>फर्म/कम्पनीको: <b>${f.companyName}</b>, शेयर सदस्यता नं: <b>${f.shareholderNumber}</b>, रजिष्ट्रेशन कार्यालयको नाम: <b>${f.registrationOffice}</b></p>
      <p>रजिष्ट्रेशन नं: <b>${f.registrationNumber}</b>, मिति: <b>${f.registrationDate}</b>, आयकर पान नं (PAN): <b>${f.panNumber}</b>, मिति: <b>${f.panDate}</b></p>
      <p>व्यापारको प्रकार: <b>${f.businessType || "—"}</b></p>
      <p>परियोजना स्थल: <b>${f.projectLocation || "—"}</b></p>
      <p>परियोजनाको अनुमानित कुल लागत: <b>${f.projectCost || "—"}</b></p>
    `;
  }

  return `<body>

    <div class="flex relative flex-row justify-center items-center">
        <div class="absolute left-2 top-2 mr-10 size-20">
            <img class="rounded-full" src="/image_dir/LogoOnly.png" alt="Logo" />
        </div>
        <div class="">
            <h1 class="text-xs mt-5 text-center">सहकारी ऐन २०४८ बमोजिम स्थापित</h1>
            <h2 class="font-bold text-center mt-1 tracking-widest">द सहारा लोन सेविम्स को अपरेटिभ सोसाइटी लिमिटेड</h2>
            <h3 class="text-sm text-center">रजिष्टर्ड प्रधान कार्यालय मलंगवा, सलाही (नेपाल)</h3>
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
    <h5 class="my-1">शाखा: <b>${f.branch || "-"}</b></h5>

    <p class="my-1 mb-2">
      कृपया निम्न विवरण खुलाइ म/हामीले <b>${f.desc1}</b> कार्यको लागि माग गरेको रु 
      <b>${f.amount}</b> अक्षरमा रु <b>${f.amount_text}</b> को सुविधा स्वीकृत गरी दिनु हुन अनुरोध गर्दछु/छौं।
    </p>

    <p>ऋण निवेदकको नाम थर: <b>${f.applicant_name}</b></p>

    <p>
      स्थायी ठेगाना (ना.प्र.प) अनुसार :  
      <b>${f.address.permanent.province}</b>, 
      <b>${f.address.permanent.district}</b>, 
      <b>${f.address.permanent.palika || "—"}</b>, 
      <b>${f.address.permanent.wada || "—"}</b>, 
      <b>${f.address.permanent.tole || "—"}</b>
      र हाल बसोबास:  
      <b>${f.address.current.province}</b>, 
      <b>${f.address.current.district}</b>, 
      <b>${f.address.current.palika || "—"}</b>, 
      <b>${f.address.current.wada || "—"}</b>, 
      <b>${f.address.current.tole || "—"}</b>
    </p>

    <h2>फोन नं: <b>${f.phone1}</b>, <b>${f.phone2}</b></h2>
    <h3>शैक्षिक योग्यता: <b>${f.personal_education}</b></h3>

    ${applicantDetails}

    <table border="1" class="text-xs my-3" cellspacing="0" cellpadding="6" width="100%">
        <tr>
            <th>S No</th>
            <th>कर्जा सुविधा</th>
            <th>रकम</th>
            <th>भुक्तानी अवधि</th>
            <th>कैफियत</th>
        </tr>
        ${f.table1
          .map(
            (row, index) => `
        <tr>
            <td><b>${index + 1}</b></td>
            <td><b>${row["कर्जा सुविधा"] || "—"}</b></td>
            <td><b>${row["रकम"] || "—"}</b></td>
            <td><b>${row["भुक्तानी अवधि"] || "—"}</b></td>
            <td><b>${row["कैफियत"] || "—"}</b></td>
        </tr>`
          )
          .join("")}
    </table>

    <p>व्याज बुझाउने: <b>${f.paymentFrequency}</b></p>

    <script>
      window.onload = () => { window.print(); };
    </script>
</body>`;
}
