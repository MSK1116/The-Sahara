"use client";
import NepaliDateInput from "@/components/NepaliDatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Create_form3 = ({ LMSIN, onDataChange }) => {
  const [localData, setLocalData] = useState({});
  const [form3, setFrom3] = useState({});

  const handleDataFetch = async () => {
    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN });

      if (temp.data) {
        setLocalData(temp.data ?? {});
        setFrom3(temp.data.form3 ?? {});
        console.log(temp.data.form3 ?? {});
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
      onDataChange({ form3 });
    }
  }, [form3]);
  return (
    <>
      <div className="pt-10 px-10 pb-0">
        <h1 className="text-xl select-none tracking-wide font-semibold mb-10 px-3 py-1 bg-gray-100 rounded-md w-fit">मालपोतको लागि रोका पत्र</h1>

        <div className=" flex flex-row items-center justify-between">
          <div className=" flex flex-row items-center justify-center space-x-5">
            <div>
              <Label className={"mb-2"}>कार्यालयको किसिम</Label>
              <Select onValueChange={(val) => setFrom3((d) => ({ ...d, branchType: val }))} value={form3.branchType || ""} className="mt-2">
                <SelectTrigger>
                  <SelectValue placeholder="कार्यालयको किसिम"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"प्रधान कार्यालय "}>प्रधान कार्यालय</SelectItem>
                  <SelectItem value={"मुख्य साखा कार्यालय"}>मुख्य साखा कार्यालय</SelectItem>
                  <SelectItem value={"सेवा केन्द्र"}>सेवा केन्द्र</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              {" "}
              <Label>कार्यालय</Label>
              <Input className="mt-2" disabled readOnly value={localData?.form1?.branch || " "}></Input>
            </div>
            <div className=" w-20">
              <Label>कोड: </Label>
              <Input value={form3.branchCode || ""} onChange={(e) => setFrom3((d) => ({ ...d, branchCode: e.target.value }))} className="mt-2"></Input>
            </div>
            <div className=" w-30">
              <Label>पत्र नं. </Label>
              <Input className="mt-2" value={form3.malpotLetterNo || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotLetterNo: e.target.value }))}></Input>
            </div>
            <div className=" w-35">
              <Label>चलानी नं.</Label>
              <Input className="mt-2" value={form3.malpotLetterChalaniNo || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotLetterChalaniNo: e.target.value }))}></Input>
            </div>
          </div>
          <div className=" w-50">
            <Label className={"mb-2"}>मिति:</Label>
            <NepaliDateInput value={form3.malpotLetterDate || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotLetterDate: e }))} />
          </div>
        </div>
        <div className=" mt-5">
          <div className=" w-1/3">
            <Label className={"mb-2"}>मालपोत कार्यलय को नाम:</Label>
            <Input value={form3.malpotOfficeName || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotOfficeName: e.target.value }))}></Input>
          </div>
        </div>
        <div className=" mt-5">
          <div className=" w-1/3">
            <Label className={"mb-2"}>पर्तिनिधी :</Label>
            <Input value={form3.malpotOfficerName || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotOfficerName: e.target.value }))}></Input>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create_form3;
