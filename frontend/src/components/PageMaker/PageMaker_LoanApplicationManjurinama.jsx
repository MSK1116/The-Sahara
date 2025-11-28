import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";

export function PageMaker_LoanApplicationManjurinama(data) {
  const f = data.form1;
  const f2 = data.form2;
  const f3 = data.form3;
  const f4 = data.form4;

  var p1 = "";
  var p2 = "";
  var p3 = "";

  var p4 = "";
  var p5 = "";

  var p7 = "";
  var p8 = "";

  if (f.applicant_gender == "male") {
    p1 = " को  नाती ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p1 = "को  नातिनी ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p1 = "को  बुहारी ";
  }

  if (f.applicant_gender == "female") {
    p2 = "छोरि";
  } else if (f.applicant_gender == "male") {
    p2 = "छोरा";
  }

  if (f.applicant_gender == "male") {
    p3 = "श्री ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p3 = "श्रीमती ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p3 = "शुश्री ";
  }

  if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p7 = f.applicant_spouse_name + " को पतनी ";
  }

  // idea
  if (f.approver_applicant_gender == "male") {
    p4 = " को  नाती ";
  } else if (f.approver_applicant_gender == "female" && f.approver_applicant_maritalStatus == "single") {
    p4 = "को  नातिनी ";
  } else if (f.approver_applicant_gender == "female" && f.approver_applicant_maritalStatus == "married") {
    p4 = "को  बुहारी ";
  }

  if (f.approver_applicant_gender == "female") {
    p5 = "छोरि";
  } else if (f.approver_applicant_gender == "male") {
    p5 = "छोरा ";
  }

  if (f.approver_applicant_gender == "female" && f.approver_applicant_maritalStatus == "married") {
    // p7 is already used for ...
    p8 = f.approver_spouse_name + " को पतनी ";
  }

  const today = new Date();

  const table7Row = f.table7 && f.table7.length > 0 ? f.table7 : [{}];
  const table7HTML2 = `
  <table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
  <thead>
    <tr>
   
      <th >क्रम स.</th>
      <th >जग्गाधनीको नाम</th>
      <th >जिल्ला</th>
      <th >न.पा./गा.वि.स.</th>
      <th >वार्ड नं.</th>
      <th >कित्ता नं.</th>
      <th >क्षेत्रफल</th>
    </tr>
  </thead>
  <tbody>
    ${table7Row
      .map((row, index) => {
        if (!row.govApprovedPrice || !row.localApprovedPrice) return "";
        if (row.ownerName !== f.approver_applicant_name) return "";
        return `
          <tr>
            <td>${convert(index + 1, "toNp")}</td>
            <td>${row.ownerName || ""}</td>
            <td>${row?.district || ""}</td>
            <td>${row.palika || ""}</td>
            <td >${row.wardNo || ""}</td>
            <td>${row.plotNo || ""}</td>
            <td class="text-nowrap whitespace-nowrap">${row.area || ""}</td>
          </tr>
        `;
      })
      .join("")}
  </tbody>
  </table>
  `;

  return `

<body class=" ml-5 flex flex-row">
    <div class="flex w-[10%] h-full">
        <div class=" pr-4 mb-auto mt-45 text-center b text-xs ">
            <p>
                 संस्थाको तर्फबाट कागज जाँच गर्नेको दस्तखत : ___________<br><br>
                 संस्थाको तर्फबाट कागज तयार गर्नेको नाम र दस्तखत: _______________
                
            </p>
            <p class="ml-2 my-2">
                जिल्ला __________ गा.वि.स/गा.पा/न. पा. ___________वडा नं. ___________ मा बस्ने वर्ष _____ को
                ______________
            </p>
            <p class="my-2">
                जिल्ला ________ गा.वि.स/गा.पा/न. पा. ___________ वडा नं. ___________ मा बस्ने वर्ष _____ को
                ______________
            </p>
            <p class=" font-semibold">साक्षी :</p>
        </div>
    </div>

    <div class="px-4 ml-15 text-sm text-justify">
        <h1 class="my-3 underline  text-center font-semibold">मन्जुरीनामा</h1>
        <p>
            लिखितम् ${f.approver_inlaws_name || ""} ${p4 || "-"} ${f.approver_father_name || ""} को ${p5 || "-"} ${p8 || ""}
            जिल्ला ${f.approverAddress.permanentOld.district || ""} गा.वि.स./न. पा. ${f.approverAddress.permanentOld.palika || ""}
            वडा नं. ${convert(f.approverAddress.permanentOld.wada || "1", "toNp")} हाल
            जिल्ला ${f.approverAddress.permanent.district || ""} गा.पा./न. पा. ${f.approverAddress.permanent.palika || ""}
            वडा नं. ${f.approverAddress.permanent.wada || "1"} बस्ने वर्ष ${convert(f.approver_age || "", "toNp")} को म ${f.approver_applicant_name || ""} आगे
            ${f.applicant_inlaws_name || ""} ${p1} ${f.applicant_father_name || ""} को ${p2} ${p7 || ""}
            जिल्ला ${f.address.permanentOld.district || ""} गा.वि.स./न. पा. ${f.address.permanentOld.palika || ""}
            वडा नं. ${convert(f.address.permanentOld.wada || "1", "toNp")} हाल
            जिल्ला ${f.address.permanent.district || ""} गा.पा./न. पा. ${f.address.permanent.palika || ""}
            वडा नं. ${convert(f.address.permanent.wada || "1", "toNp")} बस्ने वर्ष ${convert(f.age || "", "toNp")} को ${p3} ${f.applicant_name || ""} ले ${f.desc1 || "-"} कार्य गर्न
            भनी यस द सहारा लोन सेविंग्स
            को-ऑपरेटिभ सोसाइटी लिमिटेड, ${f.branchType} ${f.branch} वाट ऋण रकम रु. ${f2.fiftyPercentMargin ? convert(f2.fiftyPercentMargin, "toNp") : ""}/- (अक्षरेपी रु.
            ${f2.fiftyPercentMargin_text || ""} मात्र ) कर्जा लिने भएको र सो कर्जा लिन धितो राखी दिनु होस भनी निज
            ${f.applicant_name || ""} ले अन्नु भएको ₹ उपरोक्त बमोजिम धितो राखी दिन मन्जुर छ कि छैन भनी द
            सहारा लोन सेविंग्स को-ऑपरेटिभ सोसाइटी लिमिटेड, ${f.branchType} ${f.branch} मा सोधनी हुँदा सोधनी गर्दा
            मेरो चित्त बुभ्यो तमसुकमा लेखिए अनुसारको लिनु दिनु हुने वापत तपसिलमा लेखिएको अरु कसैलाई कुनै
            व्यहोराको लिखित नगरी दिएको मेरो हक भोगको जग्गा जाय जेथा धितों राखी ${f.applicant_name || ""} लाई
            कर्जा कारोवार गर्न गराउन मन्जुर छ निज ऋणीले यस द सहारा लोन सेविंग्स को-ऑपरेटिभ सोसाइटी
            लिमिटेड ${f.branchType || ""} ${f.branch || ""} गरेको तमसुक अनुसार समयमा ऋण नतीरेमा मैले मन्जुरीनामा गरी
            लेखि दिएको जग्गा जाय जेथा लिलाम विक्री गरी असुल उपर गरेमा मेरो मन्जुरी छ । पछि कुनै किसिमको
            उजुर बाजुर गर्ने छैन, गरे यसै कागजले बदर गरी दिनु भनी म आफ्नो ख़ुशी राजीले यस द सहारा लोन
            सेविंग्स को-ऑपरेटिभ सोसाइटी लिमिटेड ${f.branchType || ""} ${f.branch || ""} मा बसी
            किनाराको साक्षीहरुको रोहवरमा यो मन्जुरीनामाको कागज लेखि सही छाप गरी द सहारा लोन सेविंग्स को-ऑपरेटिभ सोसाइटी
            लिमिटेड ${f.branchType || ""} ${f.branch || ""} लाई दिएँ।
        </p>

        <h3 class="my-5 text-center underline font-semibold">तपसिल</h3>
        ${table7HTML2}
        <p class="my-2">ईती सम्वत ${new NepaliDate(today).format("YYYY", "np")} साल ${new NepaliDate(today).format("MMMM", "np")}
            महिना ${new NepaliDate(today).format("DD", "np")} गते रोज ${new NepaliDate(today).format("ddd", "np")} मा
            शुभम्
            ________</p>
        <div class="my-2">
            <p class="font-semibold my-3 underline">संस्थाको प्रयोजनको लागि :- </p>
            <p>मालपोत कार्यालय ${f3?.malpotOfficeName || ""} बाट धितो रोक्का भएको प्राप्त पत्रको प.सं.
                ${convert(f4?.malpotOfficeReplyPageNo || "1", "toNp")} च.नं. ${convert(f4?.malpotOfficeReplyChalaniNo || "1", "toNp")} मिति ${new NepaliDate(f4?.malpotOfficeReplyDate || today).format("YYYY/MM/DD", "np")}</p>
            <p class="mt-1.5">मन्जुरीनामा दिनेको नागरिकता नं. ${f.approver_citizenship_number || ""} मिति ${
    f?.approver_citizenship_takenDate && new NepaliDate(f?.approver_citizenship_takenDate || today).format("YYYY/MM/DD", "np")
  } गते दिने कार्यालयको नाम:
                ${f.approver_citizenship_takenOffice || ""}</p>
        </div>
    </div>


    <script>
      window.onload = () => { window.print(); };
    </script>
</body>
`;
}
