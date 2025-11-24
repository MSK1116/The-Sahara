import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";

export function PageMaker_LoanApplicationFamily(data) {
  const f = data.form1;
  const f2 = data.form2;

  var p1 = "";
  var p2 = "";
  var p3 = "";
  var p4 = "";
  // applicant_inlaws_name;
  if (f.applicant_gender == "male") {
    p1 = "बजे";
    p3 = "नाती ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p1 = "बजे";
    p3 = "नातिनी ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p1 = "ससुरा ";
    p3 = "बुहारी ";
  }
  if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p2 = "पति ";
    p4 = "पतनी ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p2 = "बुवा";
    p4 = "छोरि";
  } else if (f.applicant_gender == "male") {
    p2 = "बुवा ";
    p4 = "छोरा ";
  }

  const landOwnerDetails = [
    `नाम: ${f.applicant_name || ""}`,
    `${p1}:${f.applicant_inlaws_name || ""} ${p1}`,
    `${p2}: ${f.applicant_father_name || ""}`,
    `साबिक ठेगाना : जिल्ला ${f.address.permanentOld?.district || ""} 
   गा.वि.स./न. पा. ${f.address.permanentOld?.palika || ""} 
   वडा नं. ${convert(f.address.permanentOld?.wada || "1", "toNp")}`,
    `जिल्ला ${f.address.permanent?.district || ""} 
   गा.वि.स./न. पा. ${f.address.permanent?.palika || ""} 
   वडा नं. ${convert(f.address.permanent?.wada || "1", "toNp")}`,
  ];

  const landOwnerDetails2 = [
    `नाम: ${f.approver_applicant_name || ""}`,
    `${p1}:${f.approver_inlaws_name || ""}`,
    `${p2}:${f.approver_father_name || ""}`,
    `साबिक ठेगाना : जिल्ला ${f.address.permanentOld?.district || ""} 
   गा.वि.स./न. पा. ${f.address.permanentOld?.palika || ""} 
   वडा नं. ${convert(f.address.permanentOld?.wada || "1", "toNp")}`,
    `जिल्ला ${f.address.permanent?.district || ""} 
   गा.वि.स./न. पा. ${f.address.permanent?.palika || ""} 
   वडा नं. ${convert(f.address.permanent?.wada || "1", "toNp")}`,
  ];

  const table7Row = f.table7 && f.table7.length > 0 ? f.table7 : [{}];
  const table2Row = f.table2 && f.table2.length > 0 ? f.table2 : [{}];

  const landDetails = table7Row.filter((row) => row.govApprovedPrice && row.localApprovedPrice && row.ownerName === f.applicant_name);
  const landDetails2 = table7Row.filter((row) => row.govApprovedPrice && row.localApprovedPrice && row.ownerName === f.approver_applicant_name);
  const ownerNamesString = [...new Set(f.table7.filter((row) => row.govApprovedPrice && row.localApprovedPrice).map((row) => row.ownerName || "Unknown"))].join(" र ");

  const fixedRows = Array.from({ length: 5 }, (_, i) => landDetails[i] || {});
  const fixedRows2 = Array.from({ length: 5 }, (_, i) => landDetails2[i] || {});
  const table7HTM = `
<table border="1" cellspacing="0" cellpadding="0" width="100%"  class="text-xs mt-2 mb-1.5">
<thead>
  <tr class="">
    <th rowspan="2" class="w-1/2 text-xs p-0 font-semibold ">जग्गाधनीको विवरण</th>
    <th colspan="5" class="w-1/2 text-xs p-0 font-semibold ">जग्गाको विवरण</th>
  </tr>
  <tr class="">
    <th class="text-xs font-semibold">जिल्ला</th>
    <th class="text-xs font-semibold">न.पा./गा.वि.स.</th>
    <th class="text-xs font-semibold">वार्ड नं.</th>
    <th class="text-xs font-semibold">कित्ता नं.</th>
    <th class="text-xs font-semibold">क्षेत्रफल</th>
  </tr>
</thead>
<tbody>
${fixedRows
  .map((row, index) => {
    return `
      <tr>
        ${index === 0 ? `<td rowspan="5" class="align-top">${landOwnerDetails.join("<br>")}</td>` : ""}
        <td>${row.district || ""}</td>
        <td>${row.palika || ""}</td>
        <td>${row.wardNo || ""}</td>
        <td>${row.plotNo || ""}</td>
        <td class="text-nowrap whitespace-nowrap">${row.area || ""}</td>
      </tr>`;
  })
  .join("")}

</tbody>
</table>`;
  const table7HTM2 = `
<table border="1" cellspacing="0" cellpadding="0" width="100%" class="text-xs mt-2 mb-5">
<thead>
  <tr>
    <th rowspan="2" class="w-1/2 ">जग्गाधनीको विवरण</th>
    <th colspan="5" class="w-1/2">जग्गाको विवरण</th>
  </tr>
  <tr>
    <th>जिल्ला</th>
    <th>न.पा./गा.वि.स.</th>
    <th>वार्ड नं.</th>
    <th>कित्ता नं.</th>
    <th>क्षेत्रफल</th>
  </tr>
</thead>
<tbody>
${fixedRows2
  .map((row, index) => {
    return `
      <tr>
        ${index === 0 ? `<td rowspan="5" class="align-top">${landOwnerDetails2.join("<br>")}</td>` : ""}
        <td>${row.district || ""}</td>
        <td>${row.palika || ""}</td>
        <td>${row.wardNo || ""}</td>
        <td>${row.plotNo || ""}</td>
        <td class="text-nowrap whitespace-nowrap">${row.area || ""}</td>
      </tr>`;
  })
  .join("")}

</tbody>
</table>`;
  const table2HTML = `
    <h4 class="font-semibold text-center">सहमती दाताको विवरण</h4>
            <table border="1" cellspacing="0" cellpadding="0" width="100%" class="text-xs mt-1 mb-1.5">
                <thead>

                    <tr>
                        <th>सि.न</th>
                        <th>सहमती दाताको नाम</th>
                        <th>धितो जमानीदातार्सँगको सम्बन्ध</th>
                        <th>दस्तखत</th>
                        <th>ओठा छाप</th>
                    </tr>
                </thead>
                <tbody>
                    ${table2Row
                      .map((row, index) => {
                        return `
                    <tr>
                        <td class="w-9">${index + 1}</td>
                        <td>${row?.name || ""}
                            <br>
                            ${row?.citizenship_number || ""}
                        </td>
                        <td>${row?.relation}</td>
                        <td></td>
                        <td class=" size-36 "></td>
                    </tr>
                    `;
                      })
                      .join("")}
                </tbody>
     </table>`;

  return `

<body class=" flex flex-row ">
    <div class="flex w-[10%] h-full">
        <div class=" pr-4 text-center b text-xs ">
            
            <p class="ml-2">
              जिल्ला __________ न.पा./गा.वि.स ___________ वडा नं. _________ मा बस्ने वर्ष _____ को
                ________________
            </p>
            <p>
              जिल्ला ___________ न.पा./गा.वि.स ___________ वडा नं. ___________ मा बस्ने वर्ष _____ को
                _______________
            </p>
            <p class=" font-semibold">साक्षी :</p>
        </div>
    </div>
    <div class="px-3 text-justify">
        <h1 class="my-3">श्री द सहारा लोन सेविंग्स को-ऑपरेटिव सोसाइटी लिमिटेड <br />मुख्य शाखा मलंगवा, सलाही।</h1>
        <h2 class=" text-center">विषयः व्यक्तिगत जमानीको सहमती बारे ।</h2>
        <h3>महोदय,</h3>
        <h4 class="indent-5 text-xs">
            त्यस संस्था बाट श्री <b>${f.applicant_inlaws_name || ""}</b> को ${p3} श्री ${f.applicant_father_name || ""} को  ${p4} जिल्ला
            ${f.address.permanentOld?.district || ""} गा.वि.स./न. पा. ${f.address.permanentOld.palika || ""} वडा नं.
            ${convert(f.address.permanentOld?.wada || "-", "toNp")} हाल जिल्ला
            ${f.address.permanent.district || ""} गा.पा./न. पा. ${f.address.permanent.palika || ""} वडा नं.
            ${convert(f.address.permanent.wada || "1", "toNp")} स्थापी ठेगाना भई बसौबास ग्नें वर्ष ${convert(f.age || "", "toNp")} को श्री ${f.applicant_name || ""} को नाउँमा ${f.applicantType || "-"} कर्जां अन्तर्गत जम्मा
            रु. ${f2.fiftyPercentMargin ? convert(f2.fiftyPercentMargin, "toNp") : ""} (अक्षरेपी रु.
            ${f2.fiftyPercentMargin_text || ""} मात्र ) ऋण लिनको लागि सुरक्षण बापत धितो स्वरूप श्री ${ownerNamesString || ""} को नाउँमा जग्गाधनी प्रमाण पूर्जा भई
            हकभोगमा रहेकी तपसिलमा उल्लेख भए मोजिमको जायजेभा सुरक्षण वापत संस्थालाई धितो लेखि दिएमा धितो जमानी दातार्सँग
            तल विवरणमा भरिए वमोजिमका हामी नाता सम्बन्धका व्यक्तिहरुको पूर्ण रुपमा सहमती छ। उपरोक्त फर्म/संस्था/व्यक्ति
            ले उल्लेखित कर्ज़ा र त्यसमा
            लागने ब्याज तथा जरिवाना समेत नतिरे/ बुझाएमा सहकारी ऐन तथा संस्थाको नियमावली अनुसार तपसिलमा उल्लेखित धितोदाता
            श्री ${ownerNamesString || ""} को नाउँ
            जायजेथाबाट असुल उपर गरेमा
            मेरो/हाम्रो मञ्जुरी छ । पछि उक्त जायजेथामा मेरो/हाम्रो पनि हक लागने हो, निजले मात्र
            धितो लेखि दिदैमा मेरो/हाम्रो हक जाने होइन भनी कहि कतै उजुरी बाज़ुर गर्ने छैन यदि गरे भने यसै सहमति पत्रलाई आधार
            मानि मेरो/हाम्रो दाबी खारेज होस् भनी यो सहमतिपत्रको कागजात पटक-पटक ऋण लिन गरेमा दाबी पूर्ण रूपले
            मंजुरी हुने भनि सहिछाप गरी द सहारा लोन सेविंग्स को-ऑपरेटिभ सोसाइटी लिमिटेड, ${f.branchType || ""} ${f.branch || ""} लाई दियाँ /
            दिया । साक्षी
            किनाराको सदर ।
        </h4>
        <div>
        <h1 class="my-0.5 font-semibold text-center">तपसिल </h1>
              ${table7HTM}
              ${f.approver_applicant_name ? table7HTM2 : ""}
              ${table2HTML}
        </div>
                    <p class="mt-1.5">इति सम्बत्: ${new NepaliDate(new Date()).format("YYYY", "np")} साल ${new NepaliDate(new Date()).format("MMMM", "np")} महिना ${new NepaliDate(new Date()).format("DD", "np")} गते रोज ${new NepaliDate(
    new Date()
  ).format("ddd", "np")} मा शुभम् ।</p>

        <div class="my-2 px-15 text-center flex flex-row justify-between items-center">
            <div>___________<br>तयार गर्ने</div>
            <div>___________<br>सदर गर्ने</div>

        </div>
    </div>

    <script>
      window.onload = () => { window.print(); };
    </script>
</body>
`;
}
