export function PageMaker_LoanApplicationPage1(data) {
  const f = data;
  console.log(f);

  // Conditional content for applicant type
  let applicantDetails = "";
  if (f.applicantType === "व्यक्ति") {
    applicantDetails = `<p>ऋण निवेदकको प्रकार: ${f.applicantType}</p>`;
  } else {
    applicantDetails = `
      <p class="mt-2">ऋण निवेदकको प्रकार: ${f.applicantType}</p>
      <p>फर्म/कम्पनीको: ${f.companyName}, शेयर सदस्यता नं: ${f.shareholderNumber}, रजिष्ट्रेशन कार्यालयको नाम: ${f.registrationOffice}</p>
      <p>रजिष्ट्रेशन नं: ${f.registrationNumber}, मिति: ${f.registrationDate}, आयकर पान नं (PAN): ${f.panNumber}, मिति: ${f.panDate}</p>
      <p>व्यापारको प्रकार: ${f.businessType || "—"}</p>
      <p>परियोजना स्थल: ${f.projectLocation || "—"}</p>
      <p>परियोजनाको अनुमानित कुल लागत: ${f.projectCost || "—"}</p>
    `;
  }

  return `<body>

    <div class="flex relative flex-row justify-center items-center">
        <div class="absolute left-2 top-2 mr-10 size-20">
            <img class="rounded-full" src="/image_dir/LogoOnly.png" alt="Logo" />
        </div>
        <div class="">
            <h1 class="text-xs mt-5 text-center">सहकारी ऐन २०४८ बमोजिम स्थापित</h1>
            <h2 class="font-bold text-center mt-1 tracking-widest">द सहारा लोन सेविम्स को अपरेटिभ सोसाइटी
                लिमिटेड
            </h2>
            <h3 class="text-sm text-center">रजिष्टर्ड प्रधान कार्यालय मलंगवा, सलाही (नेपाल)</h3>
            <h4 class="mt-5 mb-2 underline text-center">Loan Application</h4>
        </div>
    </div>

    <hr>
    <div class="flex items-center text-xs mt-1 justify-between flex-row">
        <h5>ऋण माग पत्र दर्ता संख्या: -</h5>
        <h5>ऋण भाग पत्र दर्ता मिति: -</h5>
        <h5>ऋण संख्या:-</h5>
        <h5>दर्ता गर्नेको दस्तखत: -</h5>
    </div>
    <h2 class="mt-5 mb-0.5">श्रीमान् कार्यालय प्रमुख ज्यु</h2>
    <h3 class="my-1">द सहारा लोन सेविम्स को अपरेटिभ सोसाइटी लिमिटेड</h3>
    <h4 class="my-1">प्रधान कार्यालय मलंगवा</h4>
    <h5 class="my-1">शाखा: - ${f.branch || "-"}</h5>
    <p class="my-1 mb-2">कृपया निम्न विवरण खुलाइ म/हामीले ${f.desc1} कार्यको लागि माग गरेको रु ${f.amount} अक्षरमा रु
        ${f.amount_text} को सुविधा स्वीकृत गरी दिनु हुन अनुरोध गर्दछु/छौं। यसका लागि अन्यत्र कुनै लिखित नलेखिएको
        भए पनि रोक्का छैन। मेरो/हाम्रो हकभोग अनुसार निम्नानुसार मन्जुरीनामा बमोजिमको धितो लेखिएको छ।
        तपाईँमा उल्लेखित सम्पूर्ण विवरण मैले उपलब्ध गराएको ठिक छ। यसमा फरक परेमा म/हामी पूर्ण जिम्मेवार हुनेछु/छौं।</p>
    <p>ऋण निवेदकको नाम थर: - ${f.applicant_name}</p>

    <p>स्थायी ठेगाना: - ${f.address.permanent.province}, ${f.address.permanent.district}, ${f.address.permanent.palika || "—"}, ${f.address.permanent.wada || "—"}, ${f.address.permanent.tole || "—"} र हाल बसोबास गरेको ठेगाना: - 
        ${f.address.current.province}, ${f.address.current.district}, ${f.address.current.palika || "—"}, ${f.address.current.wada || "—"}, ${f.address.current.tole || "—"}</p>

    <h2>फोन नं: ${f.phone1}, ${f.phone2}</h2>
    <h3>शैक्षिक योग्यता: - ${f.personal_education}</h3>

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
            <td>${index + 1}</td>
            <td>${row["कर्जा सुविधा"] || "—"}</td>
            <td>${row["रकम"] || "—"}</td>
            <td>${row["भुक्तानी अवधि"] || "—"}</td>
            <td>${row["कैफियत"] || "—"}</td>
        </tr>`
          )
          .join("")}
    </table>
    <p>व्याज बुझाउने: - ${f.paymentFrequency}</p>

    <script>
      window.onload = () => { window.print(); };
    </script>
</body>`;
}
