"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef, useState } from "react";

const Create_form = () => {
  const [applicantType, setApplicantType] = useState("व्यक्ति");
  const otherRef = useRef(null);

  // Focus next field when pressing Enter
  const handleEnterFocus = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  // Focus the other input if "अन्य" is selected
  useEffect(() => {
    if (applicantType === "अन्य") {
      setTimeout(() => {
        otherRef.current?.focus();
      }, 100);
    }
  }, [applicantType]);

  return (
    <div className="p-10">
      <form>
        {/* ---------------------- Section 1 ---------------------------- */}
        <div className="flex flex-row items-center gap-x-10 justify-between">
          <div className="w-full">
            <Label htmlFor="rn1">ऋण मागपत्र दर्ता संख्या</Label>
            <Input id="rn1" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="rn2">ऋण संख्या</Label>
            <Input id="rn2" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="rn3">ऋण मागपत्र दर्ता मिति</Label>
            <Input id="rn3" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="rn4">दर्ता गर्नेको दस्तखत</Label>
            <Input id="rn4" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 1, Section 2</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* ---------------------- Section 2 ---------------------------- */}
        <div className="flex flex-row items-center gap-x-10 justify-between">
          <div className="w-full">
            <Label htmlFor="branch">शाखा</Label>
            <Input id="branch" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="desc1">कृपया निम्न विवरण खुलाइ म/हामीले</Label>
            <Input id="desc1" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="amount">कार्यको लागि माग गरिएको रकम रु</Label>
            <Input id="amount" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="amount_text">अक्षरेपी रु</Label>
            <Input id="amount_text" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 1, Section 3</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* ---------------------- Section 3 ---------------------------- */}
        <div className="flex flex-row items-start gap-x-10 justify-between">
          <div className="w-[30%]">
            <Label htmlFor="applicant_name">ऋण निवेदकको नाम, थर</Label>
            <Input id="applicant_name" className="w-full mt-2" onKeyDown={handleEnterFocus} />

            <div className="mt-5">
              <Label htmlFor="age">उमेर</Label>
              <Input id="age" className="mt-2" onKeyDown={handleEnterFocus} />
            </div>
          </div>

          {/* Address Section */}
          <div className="w-[70%] flex flex-row space-x-6">
            {/* Permanent Address */}
            <div className="w-1/2 space-y-5">
              <span className="font-semibold">स्थायी ठेगाना</span>

              <div>
                <Label>प्रदेश / जिल्ला / पालिका</Label>
                <Input className="w-full mt-2" onKeyDown={handleEnterFocus} />
              </div>

              <div>
                <Label>वडा नं</Label>
                <Input className="w-full mt-2" onKeyDown={handleEnterFocus} />
              </div>

              <div>
                <Label>टोल / बाटो</Label>
                <Input className="w-full mt-2" onKeyDown={handleEnterFocus} />
              </div>
            </div>

            {/* Current Address */}
            <div className="w-1/2 space-y-5">
              <span className="font-semibold">हाल बसोबास गरेको ठेगाना</span>

              <div>
                <Label>प्रदेश / जिल्ला / पालिका</Label>
                <Input className="w-full mt-2" onKeyDown={handleEnterFocus} />
              </div>

              <div>
                <Label>वडा नं</Label>
                <Input className="w-full mt-2" onKeyDown={handleEnterFocus} />
              </div>

              <div>
                <Label>टोल / बाटो</Label>
                <Input className="w-full mt-2" onKeyDown={handleEnterFocus} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 1, Section 4</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* ---------------------- Section 4 ---------------------------- */}
        <div className="flex flex-row items-center gap-x-10 justify-between">
          <div className="w-full">
            <Label htmlFor="phone1">फोन नं १</Label>
            <Input id="phone1" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="phone2">फोन नं २</Label>
            <Input id="phone2" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          <div className="w-full">
            <Label htmlFor="education">शैक्षिक योग्यता</Label>
            <Input id="education" className="w-full mt-2" onKeyDown={handleEnterFocus} />
          </div>

          {/* Dropdown Applicant Type */}
          <div className="w-full">
            <Label>ऋण निवेदकको प्रकार</Label>

            <DropdownMenu>
              <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full">{applicantType}</DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={applicantType} onValueChange={setApplicantType}>
                  <DropdownMenuRadioItem value="व्यक्ति">व्यक्ति</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="एकलौटी फर्म">एकलौटी फर्म</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="साझेदारी फर्म">साझेदारी फर्म</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="कम्पनी">कम्पनी</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="अन्य">अन्य</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {applicantType === "अन्य" && <Input ref={otherRef} placeholder="कृपया उल्लेख गर्नुहोस्" className="w-full mt-3" onKeyDown={handleEnterFocus} />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create_form;
