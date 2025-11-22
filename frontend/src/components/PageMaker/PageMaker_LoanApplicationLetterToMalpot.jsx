import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";
export function PageMaker_LoanApplicationLetterToMalpot(data) {
  const f = data.form1;
  const f2 = data.form2;
  const f3 = data.form3;

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

  if (f.applicant_gender == "male") {
    p3 = "श्री ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p3 = "श्रीमती ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p3 = "शुश्री ";
  }

  if (f.approver_applicant_name) {
    p4 = "";
  } else {
    p4 = "निज";
  }
  const table7Row = f.table7 && f.table7.length > 0 ? f.table7 : [{}];
  const ownerNamesString = [...new Set(f.table7.filter((row) => row.govApprovedPrice && row.localApprovedPrice).map((row) => row.ownerName || "Unknown"))].join(" र ");
  const table7HTML2 = `
  <p class="font-bold my-3 text-center ">तपसिल </p>
  
  <table border="1" cellspacing="0" cellpadding="6" width="100%" class="text-xs mt-2 mb-5">
  <thead>
    <tr>
      <th >जग्गाधनीको नाम</th>
      <th >जिल्ला</th>
      <th >न.पा./गा.वि.स.</th>
      <th >वार्ड नं.</th>
      <th >कित्ता नं.</th>
      <th >क्षेत्रफल</th>
      <th >कैफियत</th>
    </tr>
  </thead>
  
  <tbody>
    ${table7Row
      .map((row, index) => {
        if (!row.govApprovedPrice || !row.localApprovedPrice) return "";

        return `
          <tr>
            <td>${row.ownerName || ""}</td>
            <td>${row.district || ""}</td>
            <td>${row.palika || ""}</td>
            <td >${row.wardNo || ""}</td>
            <td>${row.plotNo || ""}</td>
            <td class="text-nowrap whitespace-nowrap">${row.area || ""}</td>
            <td>${row.remarks || ""}</td>
          </tr>
        `;
      })
      .join("")}
  </tbody>
  </table>
  `;

  return `

<body>


    <div class=" my-2 flex fex-row items-end justify-between">
        <div>
            <div class=" flex flex-row items-center justify-start space-x-4 ">
                <img class="size-20" src="/image_dir/LogoOnly.png">
                <h1 class="text-3xl font-extrabold text-shadow-md">द सहारा</h1>
            </div>
            <div class=" bg-black text-white font-bold">
                लोन सेविंग्स को-आपरेटिभ सोसाइटी लि.
            </div>
        </div>
        <div class=" flex flex-col">
            <div class=" border border-black items-center px-1 justify-center">(नेपाल सरकार सहकारी विभागबाट स्वीकृति
                प्राप्त)
                र.नं. १/०५०/०५१</div>
            <div class=" border border-black items-center px-1 justify-center">प्रधान कार्यालयः मलंगवा, सर्लाही</div>
            <div class=" border border-black items-center px-1 justify-center">फोन नं. ०४६-५२००१२, ०४६-५२०७५७ फ्याक्स
                नं.
                ०४६-५२१११४</div>
        </div>
    </div>
<hr>
    <div class="mt-2 flex flex-row items-center justify-between ">
        <div>
            <p>${f3.branchType}: - ${f.branch}</p>
            <p>पत्र संख्या: - ${f3.malpotLetterNo}</p>
            <p>चलानी न.: - ${f3.malpotLetterChalaniNo}</p>
        </div>
        <div class=" pr-10">
            <p>कोड न. :- ${f3.branchCode}</p>
            <p>मिति: - ${new NepaliDate(f3.malpotLetterDate || new Date()).format("ddd DD, MMMM YYYY", "np")}</p>
        </div>
    </div>

    <div class="my-5">
        <p class="font-bold">श्री मालपोत कार्यालय,</p>
        <p class="font-bold underline">${f3.malpotOfficeName || "-"}</p>
        <p class=" text-center font-semibold">विषयः - धितो (दृष्टि) बन्धक पारित गरिदिने बारे ।</p>
        <p class="mt-4">
            उपरोक्त सम्बन्धमा,
            जिल्ला <strong>${f.address.permanentOld.district}</strong>,
            <strong>${f.address.permanentOld.palika || "—"}</strong>,
            वडा <strong>${f.address.permanentOld.wada || "—"}</strong>,
            टोल <strong>${f.address.permanentOld.tole || "—"}</strong> मा बसोबास गर्ने व्यक्ति र हाल बसोबास परदेश
            <strong>${f.address.permanent.province}</strong>,
            जिल्ला <strong>${f.address.permanent.district}</strong>,
            <strong>${f.address.permanent.palika || "—"}</strong>,
            वडा <strong>${f.address.permanent.wada || "—"}</strong>,
            टोल <strong>${f.address.permanent.tole || "—"}</strong>
            मा बस्ने <strong>${f.applicant_inlaws_name || "-"} </strong> ${p1} <b>${f.applicant_father_name || "-"}</b> को  ${p2 || ""} वर्ष <b>${f.age ? convert(f.age, "toNp") : ""}</b> ${p3 || ""} 
         <b>${f.applicant_name || ""}</b> ले तपसिल बमोजिम जग्गा दृस्टी बन्दक लेखत संस्थाको नाउँमा पारित गराई ऋण माग गर्नु भएको हुँदा ${p4 || ""} ${ownerNamesString || ""}  को नाउँमा दर्ता कायम भएको जग्गामा स्वीकृत ऋण रकम रु.<b> ${convert(
    f2.fiftyPercentMargin,
    "toNp"
  )}/-</b> अक्षरेपी <b>${f2.fiftyPercentMargin_text || ""}</b> मात्र /- दृष्टि बन्धक लेखत पारित गराउन यस संस्थाको प्रतिनिधि ${f3.malpotOfficerName || "-"} मार्फत रोक्का राखी जानकारी पठाई दिनुहुन अनुरोध गरिन्छ ।
        </p>
    </div>

 ${table7HTML2}


  <div class=" flex flex-col">
        <p>बोधार्थ: -</p>
        <div class="mt-1 flex flex-row space-x-5">
            <div>श्री मालपोत कार्यालय, ${f3.malpotOfficeName || "-"}<br>(रोक्का फाँट)</div>
            <div>उपरोक्त तपसिलमा उल्लेख जग्गाहरु रोक्का राखिदिनुहुन ।</div>
        </div>
        <div class=" flex mt-3 flex-row space-x-5">
            <div>श्री ${f3.malpotOfficerName || "-"}<br>
                <p>द सहारा,${f3.branchType}: - ${f.branch}</p>
            </div>
            <div>दृष्टि बन्धक पारित गराई रोक्काको जानकारी समेत लिई आउनु होला ।</div>
        </div>
        <div class=" flex flex-col items-center justify-center  m-5">
            <p>दस्तखतको नमूना</p>
            <div class="mt-1 w-1/3 h-20 border"></div>
        </div>
    </div>

<script>
  window.onload = () => { window.print(); };
</script>

</body>


`;
}
