import NepaliDate from "nepali-date-converter";

export function PageMaker_LoanApplicationBharpaie(data) {
  const f = data.form1;
  const f2 = data.form2;
  const f3 = data.form3;
  return `

<body>
<div class="">
        <div>
            <h1 class="text-xl mx-auto w-fit my-2 font-bold text-center border border-black px-3 py-1">भरपाई</h1>
            <div>भरपाई दादै स्थायी ठेगाना: - ${f.address.permanent.province}, ${f.address.permanent.district},
                ${f.address.permanent.palika || "—"},
                ${f.address.permanent.wada || "—"}, ${f.address.permanent.tole || "—"} र हाल बसोबास गरेको ठेगाना: -
                ${f.address.current.province}, ${f.address.current.district}, ${f.address.current.palika || "—"},
                ${f.address.current.wada || "—"}, ${f.address.current.tole || "—"} मा बस्ने म ${f.applicant_name} यस द
                सहारा
                लोन सेविंग्स को
                औ-सो लि <b>${f3.branchType}: - ${f.branch}</b> बाट ${f.desc1 || ""} निम्न
                कामको लागि रु. ${f.amount || ""} (अक्षरेपी रुपियाँ: ${f.amount_text || ""} मात्र) नगद/चेक नं. संस्था बाट
                बुझिलिई यो भरपाई गरि दियें</div>
        </div>

        <div>
            <p class=" font-semibold underline text-center">तपसिल</p>
            <div class="px-3 border py-2 mt-1">
                <p>खाता नं. ${f.savingsAccountNumber || ""}<b> </b></p>
                <p>सेयर नं. ${f.company_shareholderNumber || ""}<b> </b></p>
                <p>ऋण नं. <b> </b></p>
            </div>

            <p class="mt-3">इति सम्बत्: ${new NepaliDate(new Date()).format("YYYY", "np")} साल ${new NepaliDate(new Date()).format("MMMM", "np")} महिना ${new NepaliDate(new Date()).format("ddd", "np")} गते रोज ${new NepaliDate(new Date()).format(
    "DD",
    "np"
  )} मा शुभम् ।</p>
        </div>
    </div>
  <p class="w-full my-10 textoverflow-hidden text-nowrap whitespace-nowrap">
        ✂️.....................................................................................................................................................................................✂️
    </p><div class=" ">
        <div>
            <h1 class="text-xl mx-auto w-fit my-2 font-bold text-center border border-black px-3 py-1">भरपाई</h1>
            <div>भरपाई दादै स्थायी ठेगाना: - ${f.address.permanent.province}, ${f.address.permanent.district},
                ${f.address.permanent.palika || "—"},
                ${f.address.permanent.wada || "—"}, ${f.address.permanent.tole || "—"} र हाल बसोबास गरेको ठेगाना: -
                ${f.address.current.province}, ${f.address.current.district}, ${f.address.current.palika || "—"},
                ${f.address.current.wada || "—"}, ${f.address.current.tole || "—"} मा बस्ने म ${f.applicant_name} यस द
                सहारा
                लोन सेविंग्स को
                औ-सो लि <b>${f3.branchType}: - ${f.branch}</b> बाट ${f.desc1 || ""} निम्न
                कामको लागि रु. ${f2.fiftyPercentMargin || ""} (अक्षरेपी रुपियाँ: ${f2.fiftyPercentMargin || ""} मात्र) नगद/चेक नं. संस्था बाट
                बुझिलिई यो भरपाई गरि दियें</div>
        </div>

        <div>
            <p class=" font-semibold underline text-center">तपसिल</p>
            <div class="px-3 border py-2 mt-1">
                <p>खाता नं. ${f.savingsAccountNumber || ""}<b> </b></p>
                <p>सेयर नं. ${f.company_shareholderNumber || ""}<b> </b></p>
                <p>ऋण नं. <b> </b></p>
            </div>

            <p class="mt-3">इति सम्बत्: ${new NepaliDate(new Date()).format("YYYY", "np")} साल ${new NepaliDate(new Date()).format("MMMM", "np")} महिना ${new NepaliDate(new Date()).format("ddd", "np")} गते रोज ${new NepaliDate(new Date()).format(
    "DD",
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
