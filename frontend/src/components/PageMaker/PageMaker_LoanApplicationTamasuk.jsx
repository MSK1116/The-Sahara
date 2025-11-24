import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";

export function PageMaker_LoanApplicationTamasuk(data) {
  const f = data.form1;
  const f2 = data.form2;
  const f3 = data.form3;
  const f4 = data.form4;

  var p1 = "";
  var p2 = "";
  var p3 = "";

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

  if (f.applicant_gender == "female") {
    p3 = f.applicant_spouse_name + "को श्रीमती " || "";
  }

  const today = new Date();

  const oneYearLater = new Date(today);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  oneYearLater.setDate(oneYearLater.getDate() - 1);
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
        return `
          <tr>
            <td>${convert(index + 1, "toNp")}</td>
            <td>${row.ownerName || ""}</td>
            <td>${row?.district || ""}</td>
            <td>${row.palika || ""}</td>
            <td >${convert(row.wardNo || "", "toNp")}</td>
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

<body class=" flex flex-row items-center">
    <div class="flex w-[10%] h-full">
        <div class=" pr-4 text-center b text-xs ">
            <p>
                संस्थाको तर्फबाट कागज जाँच गर्नेको दस्तखत : ___________ <br>
                संस्थाको तर्फबाट कागज तयार गर्नेको नाम र दस्तखत:
                ${f4?.maker || "___________"}
                
            </p>
            <p class="ml-2">
              जिल्ला ${f4?.witness2?.district || "___________"} न.पा./गा.वि.स
                ${f4?.witness2?.palika || "___________"} वडा नं. ${f4?.witness2?.ward || "___________"}मा बस्ने वर्ष _____ को 
                ${f4?.witness2?.name}
            </p>
            <p>
              जिल्ला   ${f4?.witness1?.district || "___________"} न.पा./गा.वि.स
                ${f4?.witness1?.palika || "___________"} वडा नं. ${f4?.witness1?.ward || "___________"}मा बस्ने वर्ष _____ को
                ${f4?.witness1?.name}
            </p>
            <p class=" font-semibold">साक्षी :</p>
        </div>
    </div>

    <div class="pl-5 text-justify">
        <h1 class="my-3 underline  text-center">तमसुक</h1>
        <p>
            लिखितम् धनिको नाम द सहारा लोन सेविंग्स को-ऑपरेटिव सोसाइटी लिमिटेड
            सर्लाही, मलंगवा र.नं. ०१/०५०/०५१
            मिति ०५१/०२/१३ को आगे ऋणीको नाम
            ${f.applicant_inlaws_name || ""} ${p1} ${f.applicant_father_name || ""} को ${p2} ${p3 || ""}
            जिल्ला ${f.address.permanentOld?.district || ""} गा.पा./न. पा. ${f.address.permanentOld.palika || ""}
            वडा नं. ${f.address.permanentOld.wada || ""} हाल
            जिल्ला ${f.address.permanent?.district || ""} गा.वि.स./न. पा. ${f.address.permanent.palika || ""}
            वडा नं. ${f.address.permanent.wada || ""} बस्ने वर्ष ${f.age || ""} को म ${f.applicant_name || ""} ले
            ${f.desc1 || ""} कार्य गर्नको लागि यस संस्थावाट आजका मितिमा रु. ${f2.fiftyPercentMargin ? convert(f2.fiftyPercentMargin, "toNp") : ""} (अक्षरेपी रु.
            ${f2.fiftyPercentMargin_text || ""} मात्र ) ऋण लिएको ठिक साँची हो | यो ऋणको वार्षिक ${f4.annualInterestRate || ""} % (अक्षरेपी रु.
            ${convert(f4.annualInterestRate, "toNpWord") || ""} 
            प्रतिशत) का दरसे ब्याज लगाई सो लागने ब्याज र सम्पूर्ण साँवा
            तपसिलको ऋण भुक्तानी तालिका अनुसार भुक्तानी समेत तपसिल बमोजिमका शतहरु पुरा-पुरा पालना गरी ${new NepaliDate(oneYearLater).format("YYYY", "np")} साल ${new NepaliDate(oneYearLater).format("MMMM", "np")}
            महिना ${new NepaliDate(oneYearLater).format("DD", "np")} गते भित्र
            तपसिलको ऋण भुक्तानी तालिका अनुसार तोकिएको समय मित्र नगद यस संस्थालाई बुझाउने छु। यस ऋण बापत
            अरु कसैलाई कनै व्यवहारको लिखित गरि नदिएको खास लिखित गरि सहिछाप गर्नेको हकभोगको तपसिल बमोजिमको धितो यस
            संस्थालाई लेखि दिएको छु। मेरो आफ्नै नाउँमा वर्ता रहेको जति दृष्टी र अरुको मञ्जुरीवाट धितो रहेको जति जमानतको
            रुपमा मानिने छ। तपसिलमा लेखिए वमोजिमको शर्तं पालना नभएमा वा तोकिएको म्याद भिन्न साँबा व्याज र किस्ताकी रकम
            बुझाउन नसकेमा मेरो जायजेथा रोकी वा
            नरोंकी वा मैले राखेको धितो र अरुको हकको जमानी रुपमा रहेको धिती समेत डॉँक लिलाम बिक्री गरी यसवाट र त्यसवाट
            नपुगे रोक्का रहून नसकेको समेत अन्य चल अचल जायजेयाबाट बाँकी साँवा, व्याज असुल उपर गरी लिन होला भनि मेरो
            मनोमान ख़ुशी राजीले ${f.branch || ""} स्थित द साहरा लोन सेविंग्स को-ऑपरेटिव सोसाइटी लिमिटेड, ${f.branch || ""}
            लाई बुझाई दिए । साक्षी किनाराको सदर । <br>ईती सम्वत ${new NepaliDate(today).format("YYYY", "np")} साल ${new NepaliDate(today).format("MMMM", "np")} महिना ${new NepaliDate(today).format("DD", "np")} गते रोज ${new NepaliDate(today).format(
    "ddd",
    "np"
  )} मा शुभम् ________
        </p>
        <P class="mt-2 gap-y-1.5">
        <h2 class="my-1 font-semibold">शर्तहरु :</h2>
        <span>१. यस ऋण रकमबाट तयार गरिने वाली वा खरीद हुने सामान ऋण नतिरेसम्म बिक्री गर्ने छैन र सो समेत धितोको रुपमा
            रहन मेरो

            मंजुर छ। इस प्रकार तयार हुने वाली त्यस संस्थालाई बुझाई यसबाट हुने रकमबाट मेरो तिनु पनें किस्ता रकम र अन्य
            खर्च
            केही
            भएमा सो समेत कटाई बाँकी रकम मलाई भुक्तानी दिन संस्थाको व्यवस्था प्रति मेरो मन्जुर हुनेछ।</span>
        <br>
        <span>२. संस्थाको उपर्युक्त शर्त पालना नगरेमा वा मैले गर्नु पर्नें कार्य नगरेमा मैले दिएको जानकारी पछि झूठा
            ठहरेमा
            संस्थाले
            चाहेको समयमा

            कुनै व्यवस्थाबाट पनि ऋण रकम असुल उपर गरी लिएमा पनि मेरो मंजुर हुनेछ।</span>
        <br>
        <span>३.
            यस ऋण सम्बन्धि उल्लेखित शर्तको अतिरिक्त यस संस्थाको ऐन नियम अनुसार र पछि बनाईने ऐन नियम कार्यविधि र
            प्रशासकिय

            आदेशहरु सबै मलाई मान्य हुनेछ त्यस सम्बन्धि संशोधित नियम र व्याजदर समेत मलाई लागु हुनेछ र त्यसको पालना
            गर्नेछु र
            संस्थाले
            दिइने मेरो सबै हिसाब पुरा-पुरा मान्य हुनेछ।</span>

        </P>
          ${table7HTML2}

           <div>
            <p class="font-semibold text-center my-2">ऋण भुक्तानी कार्यक्रम</p>

            <table border="1" class="text-xs border" cellspacing="0" cellpadding="6" width="100%">
                <thead>
                    <tr class="border ">
                        <th class="border-r">ऋण भुक्तानी मिति</th>
                        <th class="border-r">साँवा</th>
                        <th class="border-r">कैफियत</th>
                        <th class="border-r">कैफियत</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border-r">${new NepaliDate(oneYearLater).format("YYYY", "np")} साल ${new NepaliDate(oneYearLater).format("MMMM", "np")}
                            महिना ${new NepaliDate(oneYearLater).format("DD", "np")}
                        </td>
                        <td class="border-r">रु. ${f2.fiftyPercentMargin ? convert(f2.fiftyPercentMargin, "toNp") : ""}
                            (अक्षरेपी रु.
                            ${f2.fiftyPercentMargin_text || ""} मात्र )
                        </td>
                        <td class="border-r">
                            ऋण रकमको ${convert(f4.annualInterestRate || "", "toNp")} % ले हुने ब्याज हरेक महिना तोकीएको मितिमा बुझाउन अनिवार्य हुनेछ। तोकेको
                            समयमा व्याज नबुझाएमा थप ${convert(f4.addPer1 || "", "toNp")}% का दरले व्याज लाग्नेछ साथै तोकेको समयमा किस्ता
                            तथा साँवा नबुझाएमा थप ${convert(f4.addPer2 || "", "toNp")}% का दरले व्याज लाग्नेछ ।
                            तोकेको दिनमा व्याज नबुझाएमा मेरो बचत खाता
                            नं. ${f.savingsAccountNumber || ""}
                            बाट कट्टा गरि लिएमा मलाई मंजुर छ।
                        </td>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </table>

            <p class="my-2">ईती सम्वत ${new NepaliDate(today).format("YYYY", "np")} साल ${new NepaliDate(today).format("MMMM", "np")}
                महिना ${new NepaliDate(today).format("DD", "np")} गते रोज ${new NepaliDate(today).format("ddd", "np")} मा शुभम् ________</p>
        </div>
        <div class="my-2">
            <p class="font-semibold my-2 underline">संस्थाको प्रयोजनको लागि :- </p>
            <p>धितो रोक्काको लागि संस्थाबाट पत्र संख्या ${f3?.malpotLetterNo || ""} च.न ${f3?.malpotLetterChalaniNo || ""} मिति ${new NepaliDate(f3?.malpotLetterDate || today).format("YYYY/MM/DD", "np")}</p>
            <p>मालपोत कार्यालय ${f3?.malpotOfficeName || ""} बाट धितो रोक्का भएको प्राप्त पत्रको प.सं. ${f4?.malpotOfficeReplyPageNo || ""} मिति ${
    f4?.malpotOfficeReplyDate && new NepaliDate(f4?.malpotOfficeReplyDate || today).format("ddd DD, MMMM YYYY", "np")
  } च.नं. ${f4?.malpotOfficeReplyChalaniNo || ""}</p>
            <p>ऋणीको नागरिकता नं. ${f.citizenship_number || ""} मिति  ${f?.citizenship_takenDate && new NepaliDate(f?.citizenship_takenDate || today).format("YYYY/MM/DD", "np")} दिने कार्यलय नाम: ${f.citizenship_takenOffice || ""}</p>
        </div>
    </div>
    <script>
      window.onload = () => { window.print(); };
    </script>
</body>
`;
}
