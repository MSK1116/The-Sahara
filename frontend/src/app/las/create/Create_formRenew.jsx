"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
import convert from "number-to-nepali-words";
import axios from "axios";
import jwt from "jsonwebtoken";
import NepaliDateInput from "@/components/NepaliDatePicker";
import NepaliDate from "nepali-date-converter";

const Create_formRenew = ({ sessionAuth0, LMSIN }) => {
  const [form1, setForm1] = useState({});
  const [form4, setForm4] = useState({});
  const [localErrors, setLocalErrors] = useState({});

  const user = jwt.decode(sessionAuth0?.tokenSet?.idToken);

  const handleDataFetch = async () => {
    try {
      const temp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`,
        { LMSIN, databaseSlug: user?.databaseSlug },
        {
          headers: {
            Authorization: `Bearer ${sessionAuth0?.tokenSet?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (temp.data) {
        console.log(temp);
        setForm1(temp.data.form1 ?? {});
        setForm4(temp.data.form4 ?? {});
        window.alert("Coming soon...");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  const handleEnterFocus = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  }, []);

  const convertNumberToWords = (value) => {
    if (value === "" || value == null) return "";

    try {
      const cleaned = Number(String(convert(value || "", "toEn")).replace(/,/g, ""));
      if (typeof convert === "function") {
        try {
          return convert(cleaned || "", "toNpWord", "currency");
        } catch (_) {
          return convert(cleaned || "");
        }
      }
      return String(value);
    } catch {
      return String(value);
    }
  };

  const handleAgeCalculator = (value) => {
    const { year, month, date } = new NepaliDate(value).getAD();
    const today = new Date();
    return today.getFullYear() - year - (today.getMonth() < month || (today.getMonth() === month && today.getDate() < date) ? 1 : 0);
  };

  return (
    <>
      <main className=" p-10">
        {form1 && (
          <form>
            <h1 className="text-xl select-none tracking-wide font-semibold mb-10 px-3 py-1 bg-gray-100 rounded-md w-fit">नवीकरण</h1>
            <div className=" flex flex-row space-x-5">
              <div className="flex flex-col space-y-2  w-1/5">
                <Label className={localErrors.age ? "text-red-600" : ""} htmlFor="age">
                  ऋणी को उमेर
                </Label>
                <NepaliDateInput
                  handleEnterFocus={handleEnterFocus}
                  onChange={(val) => {
                    setForm1((d) => ({ ...d, age: handleAgeCalculator(val) }));
                  }}
                />
                <span className="text-center inline-flex items-center justify-center gap-1">
                  or
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>

                <Input
                  className=""
                  value={form1.age ? convert(form1.age || "", "toEn") : ""}
                  onKeyDown={handleEnterFocus}
                  onChange={(e) => {
                    const valInEn = convert(e.target.value || "", "toEn");
                    const numVal = Number(valInEn);
                    setLocalErrors((prev) => ({ ...prev, age: numVal < 18 || numVal > 85 || isNaN(numVal) }));
                  }}
                />
              </div>
              {form1.approver_applicant_name && (
                <div className="flex flex-col space-y-2 w-1/5">
                  <Label className={localErrors.approver_age ? "text-red-600" : ""}>मंजुरिनामा दिनेको उमेर</Label>
                  <NepaliDateInput onChange={(val) => setForm1((d) => ({ ...d, approver_age: handleAgeCalculator(val) }))} handleEnterFocus={handleEnterFocus} />
                  <span className="text-center inline-flex items-center justify-center gap-1">
                    or
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>{" "}
                  <Input
                    className=""
                    value={form1.approver_age ? convert(form1.approver_age || "", "toEn") : ""}
                    onKeyDown={handleEnterFocus}
                    onChange={(e) => {
                      const valInEn = convert(e.target.value || "", "toEn");
                      const numVal = Number(valInEn);
                      setForm1((d) => ({ ...d, approver_age: convert(e.target.value || "", "toNp") }));
                      setLocalErrors((prev) => ({ ...prev, approver_age: numVal < 18 || numVal > 85 || isNaN(numVal) }));
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center my-10">
              <span className="flex-1 h-px bg-gray-300"></span>
              <span className="px-4 text-sm text-gray-700">Page 1, Section 3</span>
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>
            <div className="flex flex-row space-x-5 my-5 w-full items-center justify-start">
              <div className="w-1/3">
                <Label className={localErrors.amount && "text-red-600"} htmlFor="amount">
                  कार्यको लागि माग गरिएको रकम रु
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  className="w-full mt-2"
                  value={form1.amount || ""}
                  onKeyDown={handleEnterFocus}
                  onChange={(e) => {
                    const val = e.target.value;
                    const valInEn = val.trim() === "" ? "" : convert(val, "toEn");
                    const valInNp = convert(val, "toNp");
                    const valText = val ? convertNumberToWords(val) : "";

                    setForm1((d) => ({
                      ...d,
                      amount: valInNp.trim(),
                      amount_text: valText,
                    }));

                    setLocalErrors((prev) => ({
                      ...prev,
                      amount: Number(valInEn) > 1000000 || Number(valInEn) === 0,
                    }));
                  }}
                />
              </div>

              <div className=" w-full cursor-default ">
                <Label htmlFor="amount_text">अक्षरेपी रु</Label>
                {/* show computed amount in words; make readOnly so it's always derived from numeric amount */}
                <Input
                  value={form1.amount_text || ""}
                  onChange={(e) => {
                    setForm1((d) => ({
                      ...d,
                      amount_text: e.target.value.trim(),
                    }));
                  }}
                  id="amount_text"
                  name="amount_text"
                  className="w-full mt-2 text-gray-500"
                  placeholder={!form1.amount ? "पहिले भर्नुपर्ने नम्बर राख्नुहोस्" : ""}
                />
              </div>
            </div>
            <div className=" flex flex-row items-start justify-between space-x-5">
              <div className=" flex flex-col space-y-5">
                <div>
                  <Label>ऋणको बार्षिक पर्तिसत</Label>
                  <Input
                    className="mt-2"
                    onKeyDown={handleEnterFocus}
                    value={form4?.annualInterestRate || ""}
                    onChange={(e) => {
                      const val = convert(e.target.value, "toEn").trim();
                      setForm4((d) => ({ ...d, annualInterestRate: val }));
                    }}></Input>
                </div>
                <div>
                  <Label>अक्षरेपी प्रतिशत</Label>
                  <Input onKeyDown={handleEnterFocus} disabled readOnly value={convert(form4?.annualInterestRate || "", "toNpWord") + " प्रतिशत"} className="mt-2"></Input>
                </div>
              </div>

              <div className=" ">
                <Label>तोकेको थप समयमा व्याज नबुझाएमा थप % </Label>
                <Input onKeyDown={handleEnterFocus} className="mt-2" value={form4?.addPer1 || ""} onChange={(e) => setForm4((d) => ({ ...d, addPer1: e.target?.value.trim() }))}></Input>
              </div>
              <div className=" ">
                <Label>तोकेको समयमा किस्ता तथा साँवा नबुझाएमा थप %</Label>
                <Input onKeyDown={handleEnterFocus} className="mt-2" value={form4?.addPer2 || ""} onChange={(e) => setForm4((d) => ({ ...d, addPer2: e.target?.value.trim() }))}></Input>
              </div>
            </div>
          </form>
        )}
      </main>
    </>
  );
};

export default Create_formRenew;
