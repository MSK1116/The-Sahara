import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";

export function PageMaker_LoanApplicationBharpaie(data) {
  const f = data.form1;
  const f2 = data.form2;
  const f3 = data.form3;
  return `

<body>
<div class=" flex flex-col items-stretch space-y-5">
        <div>
            <h1 class="text-xl mx-auto w-fit my-2 font-bold text-center border border-black px-3 py-1">भरपाई</h1>
            <div>भरपाई दादै स्थायी ठेगाना: -  
      जिल्ला <b>${f.address.permanentOld.district}</b>, 
      गा.वि .स/ना.पा <b>${f.address.permanentOld.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.address.permanentOld.wada || "1", "toNp")}</b>, 
      टोल <b>${f.address.permanentOld.tole || "—"}</b>
      र हाल ठेगाना:
      <b>${f.address.permanent.province}</b>, 
      जिल्ला <b>${f.address.permanent.district}</b>, 
      गा.पा / ना.पा. <b>${f.address.permanent.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.address.permanent.wada || "1", "toNp")}</b>, 
      टोल <b>${f.address.permanent.tole || "—"}</b>  मा बस्ने म ${f.applicant_name} यस द
                सहारा
                लोन सेविंग्स को
                औ-सो लि <b>${f.branchType}: - ${f.branch}</b> बाट ${f.desc1 || ""} कार्य निम्न
                कामको लागि रु. ${f2.fiftyPercentMargin || ""}/- (अक्षरेपी रुपियाँ: ${f2.fiftyPercentMargin_text || ""} मात्र) नगद/चेक नं. संस्था बाट
                बुझिलिई यो भरपाई गरि दियें</div>
        </div>

        <div>
            <p class=" font-semibold underline text-center">तपसिल</p>
            <div class="px-3 border py-2 mt-1">
                <p>खाता नं. ${f.savingsAccountNumber || ""}<b> </b></p>
                <p>सेयर नं. ${f.company_shareholderNumber || ""}<b> </b></p>
                <p>ऋण नं. <b> </b></p>
            </div>

            <p class="mt-3">इति सम्बत्: ${new NepaliDate(new Date()).format("YYYY", "np")} साल ${new NepaliDate(new Date()).format("MMMM", "np")} महिना ${new NepaliDate(new Date()).format("DD", "np")} गते रोज ${new NepaliDate(new Date()).format(
    "ddd",
    "np"
  )} मा शुभम् ।</p>
        </div>
    </div>
  <p class="w-full my-10 textoverflow-hidden text-nowrap whitespace-nowrap">
        ✂️.....................................................................................................................................................................................✂️
    </p>
<div class="">
        <div>
            <h1 class="text-xl mx-auto w-fit my-2 font-bold text-center border border-black px-3 py-1">भरपाई</h1>
            <div>भरपाई दादै स्थायी ठेगाना: -  
      जिल्ला <b>${f.address.permanentOld.district}</b>, 
      गा.वि .स/ना.पा <b>${f.address.permanentOld.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.address.permanentOld.wada || "1", "toNp")}</b>, 
      टोल <b>${f.address.permanentOld.tole || "—"}</b>
      र हाल ठेगाना:
      <b>${f.address.permanent.province}</b>, 
      जिल्ला <b>${f.address.permanent.district}</b>, 
      गा.पा / ना.पा. <b>${f.address.permanent.palika || "—"}</b>, 
      वडा नं. <b>${convert(f.address.permanent.wada || "1", "toNp")}</b>, 
      टोल <b>${f.address.permanent.tole || "—"}</b>  मा बस्ने म ${f.applicant_name} यस द
                सहारा
                लोन सेविंग्स को
                औ-सो लि <b>${f.branchType}: - ${f.branch}</b> बाट ${f.desc1 || ""} कार्य निम्न
                कामको लागि रु. ${f.fiftyPercentMargin || ""}/- (अक्षरेपी रुपियाँ: ${f.fiftyPercentMargin_text || ""} मात्र) नगद/चेक नं. संस्था बाट
                बुझिलिई यो भरपाई गरि दियें</div>
        </div>

        <div>
            <p class=" font-semibold underline text-center">तपसिल</p>
            <div class="px-3 border py-2 mt-1">
                <p>खाता नं. ${f.savingsAccountNumber || ""}<b> </b></p>
                <p>सेयर नं. ${f.company_shareholderNumber || ""}<b> </b></p>
                <p>ऋण नं. <b> </b></p>
            </div>

            <p class="mt-3">इति सम्बत्: ${new NepaliDate(new Date()).format("YYYY", "np")} साल ${new NepaliDate(new Date()).format("MMMM", "np")} महिना ${new NepaliDate(new Date()).format("DD", "np")} गते रोज ${new NepaliDate(new Date()).format(
    "ddd",
    "np"
  )} मा शुभम् ।</p>
        </div>
    </div>
    <script>
      window.onload = () => { window.print(); };
    </script>

</body>
`;
}
