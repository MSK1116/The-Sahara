"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
import convert from "number-to-nepali-words";
import axios from "axios";
import jwt from "jsonwebtoken";

const Create_formRenew = ({ sessionAuth0, LMSIN }) => {
  const [form1, setForm1] = useState({});
  const [form2, setForm2] = useState({});
  const [form3, setForm3] = useState({});
  const [form4, setForm4] = useState({});
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
        setForm2(temp.data.form2 ?? {});
        setForm3(temp.data.form3 ?? {});
        setForm4(temp.data.form4 ?? {});
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    handleDataFetch();
    window.alert("coming soon...");
  }, []);

  const handleEnterFocus = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  }, []);

  return (
    <>
      <main>
        {form1 && (
          <form>
            <div className="flex items-center my-10">
              <span className="flex-1 h-px bg-gray-300"></span>
              <span className="px-4 text-sm text-gray-700">Page 1, Section 3</span>
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>

            <div className=" flex flex-row items-start justify-around space-x-5">
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
                <Input onKeyDown={handleEnterFocus} className="mt-2" value={form4?.addPer1 || ""} onChange={(e) => setForm4((d) => ({ ...d, addPer1: e.target.value }))}></Input>
              </div>
              <div className=" ">
                <Label>तोकेको समयमा किस्ता तथा साँवा नबुझाएमा थप %</Label>
                <Input onKeyDown={handleEnterFocus} className="mt-2" value={form4?.addPer2 || ""} onChange={(e) => setForm4((d) => ({ ...d, addPer2: e.target.value }))}></Input>
              </div>
            </div>
          </form>
        )}
      </main>
    </>
  );
};

export default Create_formRenew;
