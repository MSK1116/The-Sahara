import NepaliDate from "nepali-date-converter";
import convert from "number-to-nepali-words";
export function PageMaker_LoanApplicationFrom2(data) {
  const f = data.form1;
  const f2 = data.form2;
  var p1 = "";
  var p2 = "";
  // applicant_inlaws_name;
  if (f.applicant_gender == "male") {
    p1 = "नाती ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p1 = "नातिनी ";
  } else if (f.applicant_gender == "female" && f.applicant_maritalStatus == "single") {
    p1 = "बुहारी ";
  }

  if (f.applicant_gender == female && f.applicant_maritalStatus == married) {
    p2 = "पतनी ";
  } else if (f.applicant_gender == female && f.applicant_maritalStatus == single) {
    p2 = "छोरि";
  } else if (f.applicant_gender == male && f.applicant_maritalStatus == single) {
    p2 = "छोरा ";
  }
  return `

<body>


   <div class=" my-2 flex fex-row items-center justify-between">
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

    <div class=" flex flex-row items-center justify-between ">
        <div>
            <p>प्रधान कार्यालय/ शाखा कार्यालय/नि.सं. केन्द्रः-</p>
            <p>पत्र संख्या: -</p>
            <p>चलानी न.: -</p>
        </div>
        <div class=" pr-10">
            <p>कोड न. :-</p>
            <p>मिति: -</p>
        </div>
    </div>

    <div class="my-5">
        <p class="font-bold">श्री मालपोत कार्यालय,</p>
        <p>___________</p>
        <p class=" text-center font-semibold">विषयः - धितो (दृष्टि) बन्धक पारित गरिदिने बारे ।</p>
        <p class="mt-4">
            उपरोक्त सम्बन्धमा,
            परदेश <strong>${f.address.permanent.province}</strong>,
            जिल्ला <strong>${f.address.permanent.district}</strong>,
            <strong>${f.address.permanent.palika || "—"}</strong>,
            वडा <strong>${f.address.permanent.wada || "—"}</strong>,
            टोल <strong>${f.address.permanent.tole || "—"}</strong> मा बसोबास गर्ने व्यक्ति र हाल बसोबास परदेश
            <strong>${f.address.current.province}</strong>,
            जिल्ला <strong>${f.address.current.district}</strong>,
            <strong>${f.address.current.palika || "—"}</strong>,
            वडा <strong>${f.address.current.wada || "—"}</strong>,
            टोल <strong>${f.address.current.tole || "—"}</strong>
            मा बस्ने <strong>${f.gender}</strong>
        </p>

    </div>


<script>
  window.onload = () => { window.print(); };
</script>

</body>


`;
}
