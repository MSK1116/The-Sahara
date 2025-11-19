import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";
export function PageMaker_LoanApplicationFrom2(data) {
  const f = data.form1;
  const f2 = data.form2;
  const calculateKatha = (area) => {
    if (!area) return 0;

    const parts = area.split("-").map((part) => Number(convert(part, "toEn")));
    if (parts.length === 1) return parts[0];
    if (parts.length === 4) {
      const [A, B, C, D] = parts;
      return A * 20 + B + C / 20 + D / (20 * 16);
    }
    return 0;
  };
  const table7Row = f.table7 && f.table7.length > 0 ? f.table7 : [{}];
  const table7HTML = `
<p class="font-bold my-3">धितोको विवरण :-</p>

<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
<thead>
    <tr>
      <th rowspan="2">क्र.सं.</th>
      <th rowspan="2">जग्गाधनीको नाम, थर</th>
      <th colspan="5">जग्गाको विवरण</th>
      <th rowspan="2">जग्गाको किसिम</th>
    </tr>
    <tr>
      <th>जिल्ला</th>
      <th>गा.वि.स./न.पा.</th>
      <th>वा.नं.</th>
      <th>कित्ता नं.</th>
      <th class=" text-nowrap whitespace-nowrap" >क्षेत्रफल</th>
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
        <td>${row.wardNo || ""}</td>
        <td>${row.plotNo || ""}</td>
        <td class="text-nowrap whitespace-nowrap" >${row.area || ""}</td>
        <td>${row.landType || ""}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>
`;

  const table7HTML2 = `
<p class="font-bold my-3">जग्गाको मूल्यांकनः-:-</p>

<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
<thead>
  <tr>
    <th rowspan="2">क्र.सं.</th>
    <th colspan="3">जग्गाको विवरण</th>
    <th colspan="3">मूल्यांकन</th>
    <th rowspan="2">÷ २ ले हुने रकम</th>
  </tr>
  <tr>
    <th>वा.नं.</th>
    <th>कित्ता नं.</th>
    <th>क्षेत्रफल</th>
    <th>नेपाल सरकार वा निकायले तोकेको मूल्य (प्रतिकठ्ठा)</th>
    <th>चलनचल्तीको मूल्य (प्रतिकठ्ठा)</th>
    <th>जम्मा रकम</th>  
  </tr>
</thead>

<tbody>
  ${table7Row
    .map((row, index) => {
      const katha = calculateKatha(row.area);
      if (!row.govApprovedPrice || !row.localApprovedPrice) return "";
      const total = (Number(row.govApprovedPrice) || 0) * katha + (Number(row.localApprovedPrice) || 0) * katha;
      row._total = total;
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${row.wardNo || ""}</td>
          <td>${row.plotNo || ""}</td>
          <td class="text-nowrap whitespace-nowrap">${row.area || ""}</td>
          <td>${row.govApprovedPrice ? convert(row.govApprovedPrice, "toNp") : ""}</td>
          <td>${row.localApprovedPrice ? convert(row.localApprovedPrice, "toNp") : ""}</td>
          <td>${total.toFixed(2) ? convert(total.toFixed(2), "toNp") : ""}</td>
          <td>${convert((total / 2).toFixed(2), "toNp")}</td>
        </tr>
      `;
    })
    .join("")}
</tbody>

<tfoot>
  <tr class="font-bold">
    <td colspan="6" class="text-right">जम्मा:</td>
    <td>
      ${convert(table7Row.reduce((sum, r) => sum + (r._total || 0), 0).toFixed(2), "toNp")}
    </td>
    <td>
      ${convert(table7Row.reduce((sum, r) => sum + (r._total || 0) / 2, 0).toFixed(2), "toNp")}
    </td>
  </tr>
</tfoot>

</table>
`;

  return `

<body>

<div class="flex relative flex-row justify-center items-center">
        <div class="absolute left-2 top-2 mr-10 size-20">
            <img class="rounded-full" src="/image_dir/LogoOnly.png" alt="Logo" />
        </div>
        <div class="text-center">
            <h2 class="font-bold text-xl text-center mt-1 tracking-widest">द सहारा
            </h2>
            <h3 class="text-center">लोन सेविम्स को अपरेटिभ सोसाइटी
                लिमिटेड</h3>
            <h4>प्रधान कार्यालय: मलंगवा, सर्लाही(नेपाल)</h4>
            <h3 class="text-sm text-center">रजिष्टर्ड प्रधान कार्यालय </h3>
            <h4 class="mt-3 mb-2 text-center">शाखा: <b>${f.branch}</b></h4>
            <h5 class="font-bold text-xl text-center my-3">धितो दिने घर जग्गाको मूल्याङ्कन प्रतिवेदन</h5>

        </div>

    </div>

    <hr>
    <div class="mt-2">
        <div class="flex flex-row items-center space-x-5">
            <p>मूल्यांकन गर्नेको नामः <b>${f2.evaluatorName}</b></p>
            <p>पद: <b>${f2.evaluatorPost}</b></p>
        </div>
        <div>
            <p>स्थलमा गई मूल्यांकन गरेको मितिः <b>${new NepaliDate(f2.evaluationDate).format("ddd DD, MMMM YYYY", "np")}</b></p>
            <p>ऋण निवेदकको नामः <b>${f.applicant_name}</b></p>
            <p>
                स्थायी ठेगाना: -
                <b>${f.address.permanent.province}</b>,
                <b>${f.address.permanent.district}</b>,
                <b>${f.address.permanent.palika || "—"}</b>,
                <b>${f.address.permanent.wada || "—"}</b>,
                <b>${f.address.permanent.tole || "—"}</b> र हाल बसोबास गरेको ठेगाना: -
                <b>${f.address.current.province}</b>,
                <b>${f.address.current.district}</b>,
                <b>${f.address.current.palika || "—"}</b>,
                <b>${f.address.current.wada || "—"}</b>,
                <b>${f.address.current.tole || "—"}</b>
            </p>
            <p>ऋणको उद्देश्यः- <b>${f.desc1}</b></p>
        </div>
    </div>

    ${table7HTML}
    ${table7HTML2}

  <div class=" my-5">
            <div>सिफारिस मूल्यः-</div>
            <p>उपरोक्त बमोजिमको धितोको मूल्यमा नियमानुसार ५०% मार्जिन कटाई अधिकतम रु <b>${convert(f2.fiftyPercentMargin, "toNp")}</b>
                अक्षरेपी रु. <b>${f2.fiftyPercentMargin_text}</b><br><br> धितो मूल्यांकन गर्नेको दस्तखत :- ___________
            </p>
   </div>


    <div class="my-5">
            <p>मिति: ___________ को ___________ समितिको बैठक नं. ___________ बाट ___________ शीर्षक अन्तर्गत ___________
                अवधीको लागि ___________ गर्न ऋण रु. ___________ अक्षरेपी रु. ___________ ब्याज दर ___________ मा ऋण
                उपलब्ध गराउने गरी स्वीकृत गरियो ।
            </p>
        </div>
        <div class="my-5 flex flex-row items-center justify-between px-8">
            <div class=" items-center flex flex-col">
                <p>___________</p>
                <p>सदस्य सचिव</p>
            </div>
            <div class=" items-center flex flex-col">
                <p>___________</p>
                <p>सदस्य </p>
            </div>
            <div class=" items-center flex flex-col">
                <p>___________</p>
                <p>अध्यक्ष/संयोजक</p>
            </div>
        </div>
    <script>
      window.onload = () => { window.print(); };
    </script>

</body>
`;
}
