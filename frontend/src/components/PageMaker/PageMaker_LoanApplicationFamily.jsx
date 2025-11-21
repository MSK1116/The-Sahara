import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";

export function PageMaker_LoanApplicationFamily(data) {
  const f = data.form1;
  const f2 = data.form2;
  const f3 = data.form3;
  const f4 = data.form4;
  const f5 = data.form5;

  var p1 = "";
  var p2 = "";
  var p3 = "";
  var p4 = "";
  // applicant_inlaws_name;
  if (f.applicant_gender == "male") {
    p1 = " को  नाती ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p1 = "को  नातिनी ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p1 = "को  बुहारी ";
  }
  if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p2 = "पतनी ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p2 = "छोरि";
  } else if (f.applicant_gender == "male") {
    p2 = "छोरा ";
  }

  const landOwnerDetails = [
    `${f.applicant_name || ""}`,
    `${f.applicant_inlaws_name || ""}`,
    `बाबुको नामः ${f.applicant_father_name || ""}`,
    `साबिक ठेगाना : जिल्ला ${f.address.permanent.district || ""} 
   गा.वि.स./न. पा. ${f.address.permanent.palika || ""} 
   वडा नं. ${f.address.permanent.wada || ""}`,
    `जिल्ला ${f.address.current.district || ""} 
   गा.वि.स./न. पा. ${f.address.current.palika || ""} 
   वडा नं. ${f.address.current.wada || ""}`,
  ];

  const landOwnerDetails2 = [
    `${f.approver_applicant_name || ""}`,
    `${f.approver_inlaws_name || ""}`,
    `बाबुको नामः ${f.approver_father_name || ""}`,
    `साबिक ठेगाना : --halnw bakii xa`,
    `जिल्ला ${f.address.current.district || ""} 
   गा.वि.स./न. पा. ${f.address.current.palika || ""} 
   वडा नं. ${f.address.current.wada || ""}`,
  ];

  const table7Row = f.table7 && f.table7.length > 0 ? f.table7 : [{}];
  const landDetails = table7Row.filter((row) => row.govApprovedPrice && row.localApprovedPrice && row.ownerName === f.applicant_name);
  const landDetails2 = table7Row.filter((row) => row.govApprovedPrice && row.localApprovedPrice && row.ownerName === f.approver_applicant_name);

  const fixedRows = Array.from({ length: 5 }, (_, i) => landDetails[i] || {});
  const fixedRows2 = Array.from({ length: 5 }, (_, i) => landDetails2[i] || {});
  const table7HTM = `
<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
<thead>
  <tr>
    <th rowspan="2" class="w-1/2">जग्गाधनीको विवरण</th>
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
${fixedRows
  .map((row, index) => {
    return `
      <tr>
        <td>${landOwnerDetails[index]}</td>
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
<table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
<thead>
  <tr>
    <th rowspan="2" class="w-1/2">जग्गाधनीको विवरण</th>
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
        <td>${landOwnerDetails[index]}</td>
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

  return `

<body class=" flex flex-row items-center">
    <div class="flex mt-15 w-[10%] items-center justify-center h-full my-auto ">
        <div class="p-2 b h-[90%] text-xs">
            <p class="ml-2">${f5?.witness2.district || "___________"} न.पा./गा.वि.स ${f5?.witness2.palika || "___________"} वडा नं. ${f5?.witness2.wada || "___________"}मा बस्ने ${f5?.witness2.name}</p>
            <p>${f5?.witness1.district || "___________"} न.पा./गा.वि.स ${f5?.witness1.palika || "___________"} वडा नं.
                ${f5?.witness1.wada || "___________"}मा बस्ने ${f5?.witness1.name}</p>
            <p class=" font-semibold">साक्षी :</p>
        </div>
    </div>

    <div class="pl-3">
        <h1 class="my-3">श्री द सहारा लोन सेविंग्स को-ऑपरेटिव सोसाइटी लिमिटेड <br />मुख्य शाखा मलंगवा, सलाही।</h1>
        <h2 class=" text-center">विषयः व्यक्तिगत जमानीको सहमती बारे ।</h2>
        <h3>महोदय,</h3>
        <h4 class="indent-5">
            त्यस संस्थाबाद श्री <b>${f.applicant_inlaws_name || ""}</b> -p1- श्री -p2- जिल्ला
            ${f.address.permanent.district || ""} गा.वि.स./न. पा. ${f.address.permanent.palika || ""} वडा नं.
            ${f.address.permanent.wada || ""} हाल जिल्ला
            ${f.address.current.district || ""} गा.वि.स./न. पा. ${f.address.current.palika || ""} वडा नं.
            ${f.address.current.wada || ""} स्थापी ठेगाना भई बसौबास ग्नें वर्ष ${f.age || ""} को श्री ${f.applicant_name || ""} ${f.approver_applicant_name ? f.approver_applicant_name + " र" : ""} को नौउम कर्जां अन्तर्गत जम्मा
            रु. ${f2.fiftyPercentMargin ? convert(f2.fiftyPercentMargin, "toNp") : ""} (अक्षरेपी रु.
            ${f2.fiftyPercentMargin_text || ""} मात्र ) ऋण लिनको लागि सुरक्षण बापत धितो स्वरूप श्री ${f.applicant_name || ""} को नाउँमा जग्गाधनी प्रमाण पूर्जा भई
            हकभोगमा रहेकी तपसिलमा उल्लेख भए मोजिमको जायजेभा सुरक्षण वापत संस्थालाई धिती लेखि दिएमा धितो जमानी दातार्सँग
            तल विवरणमा भरिए वमोजिमका हामी नाता सम्बन्धका व्यक्तिहरुको पूर्ण रुपमा सहमती छ। उपरोक्त फर्म/संस्था/व्यक्ति
            ले उल्लेखित कर्ज़ा र त्यसमा
            लागने ब्याज तथा जरिवाना समेत नतिरे/ बुझाएमा सहकारी ऐन तथा संस्थाको नियमावली अनुसार तपसिलमा उल्लेखित धितोदाता
            श्री ${f.applicant_name || ""} ${f.approver_applicant_name ? f.approver_applicant_name + " र" : ""} को नाडँको
            जायजेयावाट असुल उपर गरेमा
            मेरो/ हामो मञ्जुरी छ । पछि उक्त जायजेयामा मेरो हासो पनि हक लागने हो, निजले मात्र
            धितो लेखि विवैमा मेरो हाग्रो हक जाने होइन भनी कहि कते उजर बाज़ुर गने छैन यदि गरे भने इसे सहमति पत्रलाई आधार
            मानि मेरो हामरो बाबी खारेज होस् भनी यो सहमतिपत्रको कागजात पटक-पटक ऋण लिन गरेमा मेरो/हाप्रो पूर्ण रूपले
            मंजुरी हुने अन्नी सहिछाप गरी द सहारा लोन सेविंग्स को-ऑपरेटिव सोसाइटी लिमिटेड ${f.branch || ""} लाई दियाँ /
            दिया । साक्षी
            किनाराको सदर ।
        </h4>
        <div>
        <h1 class="my-2 font-semibold text-center">तपसिल </h1>
              ${table7HTM}
              ${table7HTM2}
        </div>
        <p></p>

        <!-- inside this -->
    </div>

    <script>
      window.onload = () => { window.print(); };
    </script>
</body>
`;
}
