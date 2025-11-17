"use client";
import NepaliDateInput from "@/components/NepaliDatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
import Table7 from "./Table7";
import axios from "axios";
import Table7_copy_for_form2 from "./Table7_copy_for_form2";

const Create_form2 = ({ LMSIN }) => {
  const [applicantData, setApplicantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localData, setLocalData] = useState({}); // added

  const handleDataFetch = async () => {
    setLoading(true);
    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN });

      if (temp.data) {
        setApplicantData(temp.data);
        setLocalData(temp.data.form1 ?? {}); // initialize
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  // ❗ moved outside conditional
  const handleTable7Change = useCallback((newRows) => {
    setLocalData((d) => ({ ...d, table7: newRows }));
  }, []);

  return (
    <>
      {applicantData?.form1 ? (
        <div className="pt-10 px-10 pb-0">
          <div className="flex flex-row justify-between items-center space-x-5">
            <div className="w-full">
              <Label htmlFor="name">मूल्यांकन गर्नेको नामः</Label>
              <Input className="mt-2" id="name" />
            </div>

            <div className="w-full">
              <Label htmlFor="post">पद :</Label>
              <Input className="mt-2" id="post" />
            </div>

            <div className="w-full">
              <Label htmlFor="date">स्थलमा गई मूल्यांकन गरेको मितिः</Label>
              <NepaliDateInput className="mt-2" />
            </div>
          </div>

          <span className="flex items-center my-4">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></span>
            <span className="shrink-0 px-4 text-gray-900">Page 1, Section 2</span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
          </span>

          <Table7_copy_for_form2 localData={localData} initialData={applicantData.form1?.table7} onDataChange={handleTable7Change} />
        </div>
      ) : null}
    </>
  );
};

export default Create_form2;
