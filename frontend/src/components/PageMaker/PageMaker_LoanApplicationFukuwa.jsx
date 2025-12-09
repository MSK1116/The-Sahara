import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";
export function PageMaker_LoanApplicationFukuwa(data) {
  const f = data.form1;
  const f2 = data.form2;
  const f3 = data.form3;
  const f4 = data.form4;

  var p1 = "";
  var p2 = "";
  var p3 = "";
  var p4 = "";
  var p5 = "";
  // applicant_inlaws_name;
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
    p2 = "छोरा ";
  }

  if (f.applicant_gender == "male") {
    p3 = "श्री ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p3 = "श्रीमती ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p3 = "शुश्री ";
  }

  if (f.applicant_gender == "female" && f.applicant_maritalStatus == "married") {
    p5 = f.applicant_spouse_name + " को पतनी ";
  }

  const table7Row = f.table7 && f.table7.length > 0 ? f.table7 : [{}];
  const ownerNamesString = [...new Set(f.table7.filter((row) => row.govApprovedPrice && row.localApprovedPrice).map((row) => row.ownerName || "Unknown"))].join(" र ");
  if (f.approver_applicant_name) {
    p4 = ownerNamesString.length > 1 ? "निजको " + ownerNamesString + "मन्जुरनामा बमोजिम" : f.applicant_name;
  } else {
    p4 = `निजको ${f.applicant_name}`;
  }
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
            <td >${convert(row.wardNo || "", "toNp")}</td>
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
    <div class="flex flex-row items-start relative justify-center ">
        <div class="w-25 absolute z-10 top-0 left-0"><img src="/image_dir/LogoOnly.png" /></div>
        <div class="w-fit absolute z-10 top-0 right-0">☎️: ४६-५२००१२</div>
        <div class="flex flex-1 flex-col text-center pb-2 border-b ">
            <h1 class="">(नेपाल सरकार सहकारी
                विभागबाट रजिस्टर्ड)
            </h1>
            <h2 class=" mt-2 text-4xl text-shadow-md font-bold">
                द. सहारा
            </h2>
            <h3 class="text-xl">लोन सेविग्स को अपरेटिभ सोसाइटी
                लिमिटेड</h3>
            <h3 class="text-sm text-center">प्रधान कार्यालय मलंगवा, सर्लाही</h3>
            <h4>र.नं. : १/०५०/०५१</h4>
            <h5>${f.branchType}: ${f.branch}</h5>

        </div>
    </div>
    <div class="flex flex-row items-center justify-between mt-1">
        <div>
            <p>पत्र संख्या :-...........</p>
            <p>चलानी नं. :-...........</p>
        </div>
        <div>
            मिति: ${new NepaliDate(new Date()).format("YYYY/MM/DD", "np")}
        </div>
    </div>
    <h1 class=" text-center ">विषय :- <span class=" underline font-bold">जग्गा फुकुवा सम्बन्धमा ।</span></h1>
    <div class="mt-1">
        <p>श्री मालपोत कार्यालय,</p>
        <p>${f3.malpotOfficeName || ".........."}</p>
        <p class=" indent-8 mt-1 text-justify ">उपरोक्त सम्बन्धमा स्थायी ठेगाना (ना.प्र.प) अनुसार :  
              जिल्ला <b>${f.address.permanentOld.district}</b>, 
              गा.वि .स/ना.पा <b>${f.address.permanentOld.palika || "—"}</b>, 
              वडा नं. <b>${convert(f.address.permanentOld.wada || "1", "toNp")}</b>, 
              टोल <b>${f.address.permanentOld.tole || "........."}</b>
              र हाल ठेगाना:
              <b>${f.address.permanent.province}</b>, 
              जिल्ला <b>${f.address.permanent.district}</b>, 
              गा.पा / ना.पा. <b>${f.address.permanent.palika || "—"}</b>, 
              वडा नं. <b>${convert(f.address.permanent.wada || "1", "toNp")}</b>, 
              टोल <b>${f.address.permanent.tole || "........"}</b>
        
                    मा बस्ने <strong>${f.applicant_inlaws_name || "-"} </strong> ${p1} <b>${f.applicant_father_name || "-"}</b> को  ${p2 || ""} ${p5 || ""} वर्ष <b>${f.age ? convert(f.age, "toNp") : ""}</b> को ${p3 || ""} 
                 <b>${f.applicant_name || ""}</b>  ले यस
            संस्थाबाट लिनु भएको सम्पूर्ण ऋण चुक्ता गरिसक्नु भएको हुँदा ${p4} को
             तपसिलमा उल्लेखित जग्गा ताहाँ रोक्का रहेकोले सो जग्गा फुक़ुबा गरीदिनुहुनको लागि अनुरोध
            छ।
        </p>
        <p>जग्गा रोक्का रहेको मितिः ${new NepaliDate(f4.malpotOfficeReplyDate || new Date()).format("YYYY/MM/DD", "np")} च.नं. ${f4.malpotOfficeReplyChalaniNo || "........"}</p>
        <p>रोक्का रहेको प.सं. ${f3.malpotLetterNo || "........"} च.नं. ${f3.malpotLetterChalaniNo || "......"}</p>
        <div class="mt-5">
            ${table7HTML2}
        </div>
    </div>
   <div class="mt-2">
        <p class="underline">संस्थाको प्रतिनिधि</p>
        <p>नाम: ............................................................</p>
        <p>पद: ..............................</p>
        <p>नागरिकता नं.: .......................</p>
        <p class="mt-2">हस्ताक्षर: ........................</p>
    </div>
<script>
  window.onload = () => { window.print(); };
</script>

</body>


`;
}
