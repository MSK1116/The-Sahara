"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Create_form from "../../create/Create_form";
import Create_navigator from "../../create/Create_navigator";
import toast from "react-hot-toast";
import Create_form2 from "../../create/Create_form2";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { IoSearchSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const Browser_wrapper = ({ LMSIN }) => {
  const [applicantData, setApplicantData] = useState(null);
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState({});
  const [form3Data, setForm3Data] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lmsin, setLmsin] = useState(LMSIN.replace(/-/g, ""));
  const router = useRouter();

  useEffect(() => {
    handleDataFetch();
  }, [LMSIN, currentPage]);

  const handleDataFetch = async () => {
    setLoading(true);

    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN: LMSIN });
      if (temp.data) {
        setApplicantData(temp.data);
        setForm1Data(temp.data.form1);
        setForm2Data(temp.data.form2 || {});
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applicant data.");
    } finally {
      setLoading(false);
    }
  };

  const handleForm2DataChange = ({ form1, form2 }) => {
    setForm2Data(form2);
    setForm1Data(form1);
  };

  const handleSave = async () => {
    const aggregated = {
      form1: form1Data,
      form2: form2Data,
      form3: form3Data,
    };
    console.log(aggregated);
    if (!aggregated) {
      toast.error("No data to save.");
      return;
    }
    try {
      const promise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/upsert`, { ...aggregated, LMSIN: LMSIN });
      toast.promise(promise, {
        loading: "Updating applicant...",
        success: "Applicant updated successfully!",
        error: "Failed to update applicant.",
      });
      const temp = await promise;
      temp.data && setApplicantData(temp.data.data);
      return temp.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <div className="w-full flex flex-col items-center justify-center py-10 space-y-10">
          <div className=" loader"></div>
          <div>Loading applicant data...</div>
        </div>
      </>
    );
  }

  const handleFormPage = (pageNumber) => {
    handleSave();
    setCurrentPage(pageNumber);
  };
  const handleSearch = () => {
    if (lmsin.length !== 6) {
      toast.error("LMSIN must be 6 digits");
      return;
    } else {
      const formattedLmsin = `${lmsin.slice(0, 3)}-${lmsin.slice(3)}`;
      router.push(`/las/browse/${formattedLmsin}`);
    }
  };
  return (
    <main className="flex flex-row">
      <div className="w-[90%]">
        {applicantData ? (
          <>
            {currentPage === 1 && <Create_form initialData={applicantData?.form1} onDataChange={setForm1Data} />}
            {currentPage === 2 && <Create_form2 LMSIN={LMSIN} onDataChange={handleForm2DataChange} />}
            {currentPage === 3 && <div className="p-10">Page 3 is under construction.</div>}
            {currentPage === 4 && <div className="p-10">Page 4 is under construction.</div>}
            {currentPage === 5 && <div className="p-10">Page 5 is under construction.</div>}
          </>
        ) : (
          <>
            {" "}
            <div className="w-full text-center p-10">Applicant not found.</div>
            <div className=" mx-auto size-fit flex items-center justify-center flex-col rounded-sm shadow-inner p-4 bg-gray-100">
              <IoSearchSharp className="fill-blue-700 size-15" />
              <p className="mt-3 text-center font-semibold">Quick Search</p>
              <p className="text-xs text-gray-500 mb-3 text-center">Enter the 6-digit LMSIN.</p>
              <InputOTP id="lmsin-input" maxLength={6} value={lmsin} onChange={(value) => setLmsin(value)}>
                <InputOTPGroup className={"bg-gray-50"}>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator>
                  <span>-</span>
                </InputOTPSeparator>
                <InputOTPGroup className={"bg-gray-50"}>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button variant={"outline"} type="button" onClick={handleSearch} className="w-full mt-4">
                Search
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex-1">
        <Create_navigator currentPage={currentPage} handleFormPage={handleFormPage} LMSIN={LMSIN} data={applicantData} onSave={handleSave} isEditing={true} />
      </div>
    </main>
  );
};

export default Browser_wrapper;
