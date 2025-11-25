"use client";
import convert from "number-to-nepali-words";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NepaliDateInput from "@/components/NepaliDatePicker";

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import Province1JSON from "@/asset/Province1.json";
import Province2JSON from "@/asset/Province2.json";
import Province3JSON from "@/asset/Province3.json";
import Province4JSON from "@/asset/Province4.json";
import Province5JSON from "@/asset/Province5.json";
import Province6JSON from "@/asset/Province6.json";
import Province7JSON from "@/asset/Province7.json";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

const Create_form4 = ({ LMSIN, onDataChange, user }) => {
  const allDistricts = allProvinces.flatMap((p) => p.districts.map((d) => d.name));
  const [localData, setLocalData] = useState({});
  const [form4, setForm4] = useState({});

  const handleDataFetch = async () => {
    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN, databaseSlug: user?.databaseSlug });
      if (temp.data) {
        setLocalData(temp.data ?? {});
        setForm4(temp.data.form4 ?? {});
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, [LMSIN]);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({ form4 });
    }
  }, [form4]);

  return (
    <>
      {localData.form4 ? (
        <div className="pt-10 px-10 pb-0">
          <h1 className="text-xl select-none tracking-wide font-semibold mb-10 px-3 py-1 bg-gray-100 rounded-md w-fit">तमसुक </h1>

          <div className=" flex flex-row items-start justify-around space-x-5">
            <div className=" flex flex-col space-y-5">
              <div>
                <Label>ऋणको बार्षिक पर्तिसत</Label>
                <Input
                  className="mt-2"
                  value={form4?.annualInterestRate || ""}
                  onChange={(e) => {
                    const val = convert(e.target.value, "toEn").trim();
                    setForm4((d) => ({ ...d, annualInterestRate: val }));
                  }}></Input>
              </div>
              <div>
                <Label>अक्षरेपी प्रतिशत</Label>
                <Input disabled readOnly value={convert(form4?.annualInterestRate || "", "toNpWord") + " प्रतिशत"} className="mt-2"></Input>
              </div>
            </div>

            <div className=" ">
              <Label>तोकेको थप समयमा व्याज नबुझाएमा थप % </Label>
              <Input className="mt-2" value={form4?.addPer1 || ""} onChange={(e) => setForm4((d) => ({ ...d, addPer1: e.target.value }))}></Input>
            </div>
            <div className=" ">
              <Label>तोकेको समयमा किस्ता तथा साँवा नबुझाएमा थप %</Label>
              <Input className="mt-2" value={form4?.addPer2 || ""} onChange={(e) => setForm4((d) => ({ ...d, addPer2: e.target.value }))}></Input>
            </div>
          </div>
          <span className="flex my-10 items-center">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></span>
            <span className="shrink-0 px-4 text-sm text-gray-900">Page 4, Section 2</span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
          </span>
          <div className=" my-5  px-10 text-sm space-x-3 space-y-3">
            धितो रोक्काको लागि संस्थाबाट पत्र संख्या <Input readOnly disabled className={"w-1/6"} value={localData?.form3?.malpotLetterNo || "फारम 3 बाट बुझाउनुहोस्।"}></Input> च.न{" "}
            <Input readOnly disabled value={localData?.form3?.malpotLetterChalaniNo || " फारम 3 बाट बुझाउनुहोस्।"} className={"w-1/6"}></Input> मिति{" "}
            <span className=" font-semibold">{localData?.form3?.malpotLetterDate || "फारम १ बाट बुझाउनुहोस्।"}</span>
            <br></br>
            मालपोत कार्यालय {localData?.form3?.malpotOfficeName || ""} बाट धितो रोक्का भएको प्राप्त पत्रको प.सं.{" "}
            <Input
              value={form4?.malpotOfficeReplyPageNo || ""}
              onChange={(e) => {
                setForm4((d) => ({ ...d, malpotOfficeReplyPageNo: e.target.value }));
              }}
              className={"w-1/6"}></Input>{" "}
            मिति <NepaliDateInput value={form4?.malpotOfficeReplyDate || ""} onChange={(val) => setForm4((d) => ({ ...d, malpotOfficeReplyDate: val }))} className={"w-1/6 "}></NepaliDateInput> च.नं.
            <Input value={form4?.malpotOfficeReplyChalaniNo || ""} onChange={(e) => setForm4((d) => ({ ...d, malpotOfficeReplyChalaniNo: e.target.value }))} className={"w-1/6"}></Input> <br></br>ऋणीको नागरिकता नं.{" "}
            {localData?.form1?.citizenship_number || ""} मिति {localData?.form1?.citizenship_takenDate || <span className="text-red-500">कृपया फारम १ बाट बुझाउनुहोस्।</span>} दिने कार्यलय नाम:{" "}
            {localData?.form1?.citizenship_takenOffice || <span className="text-red-500">कृपया फारम १ बाट बुझाउनुहोस्।</span>}
          </div>
          <span className="flex my-10 items-center">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></span>
            <span className="shrink-0 px-4 text-sm text-gray-900">Page 4, Section 3</span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
          </span>
          <div className=" space-y-5 mb-10 h-[90%] text-sm">
            <p className=" font-semibold">साक्षी :</p>
            <p className="space-x-3 space-y-3 ">
              जिल्ला{" "}
              <DropdownMenu>
                <DropdownMenuTrigger className="w-1/6 text-xs text-left border px-2 py-1 rounded-md">{form4?.witness1?.district || "जिल्ला चयन गर्नुहोस्"}</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={form4?.witness1?.district || ""}
                    onValueChange={(val) =>
                      setForm4((d) => ({
                        ...d,
                        witness1: {
                          ...d.witness1,
                          district: val,
                        },
                      }))
                    }>
                    {allDistricts.map((d, idx) => (
                      <DropdownMenuRadioItem key={d + "112" + idx} value={d}>
                        {d}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              न.पा./गा.वि.स{" "}
              <Input
                value={form4?.witness1?.palika || ""}
                onChange={(val) =>
                  setForm4((d) => ({
                    ...d,
                    witness1: {
                      ...d.witness1,
                      palika: val.target.value,
                    },
                  }))
                }
                className={"w-1/6"}></Input>{" "}
              वडा नं.{" "}
              <Input
                value={form4?.witness1?.ward || ""}
                onChange={(val) =>
                  setForm4((d) => ({
                    ...d,
                    witness1: {
                      ...d.witness1,
                      ward: val.target.value,
                    },
                  }))
                }
                className={"w-1/6"}></Input>{" "}
              मा बस्ने{" "}
              <Input
                value={form4?.witness1?.name || ""}
                onChange={(val) =>
                  setForm4((d) => ({
                    ...d,
                    witness1: {
                      ...d.witness1,
                      name: val.target.value,
                    },
                  }))
                }
                className={"w-1/6"}></Input>
            </p>
            <p className=" space-x-3 space-y-3">
              जिल्ला{" "}
              <DropdownMenu>
                <DropdownMenuTrigger className="w-1/6 text-xs text-left border px-2 py-1 rounded-md">{form4?.witness2?.district || "जिल्ला चयन गर्नुहोस्"}</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={form4?.witness2?.district || ""}
                    onValueChange={(val) =>
                      setForm4((d) => ({
                        ...d,
                        witness2: {
                          ...d.witness2,
                          district: val,
                        },
                      }))
                    }>
                    {allDistricts.map((d, idx) => (
                      <DropdownMenuRadioItem key={d + "12" + idx} value={d}>
                        {d}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              न.पा./गा.वि.स{" "}
              <Input
                value={form4?.witness2?.palika || ""}
                onChange={(val) =>
                  setForm4((d) => ({
                    ...d,
                    witness2: {
                      ...d.witness2,
                      palika: val.target.value,
                    },
                  }))
                }
                className={"w-1/6"}></Input>{" "}
              वडा नं.{" "}
              <Input
                value={form4?.witness2?.ward || ""}
                onChange={(val) =>
                  setForm4((d) => ({
                    ...d,
                    witness2: {
                      ...d.witness2,
                      ward: val.target.value,
                    },
                  }))
                }
                className={"w-1/6"}></Input>{" "}
              मा बस्ने{" "}
              <Input
                value={form4?.witness2?.name || ""}
                onChange={(val) =>
                  setForm4((d) => ({
                    ...d,
                    witness2: {
                      ...d.witness2,
                      name: val.target.value,
                    },
                  }))
                }
                className={"w-1/6"}></Input>
            </p>
            <p className="">
              संस्थाको तर्फबाट कागज तयार गर्नेको नाम : <Input value={form4?.maker || ""} onChange={(val) => setForm4((d) => ({ ...d, maker: val.target.value }))} className={"w-1/6"}></Input>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Create_form4;
