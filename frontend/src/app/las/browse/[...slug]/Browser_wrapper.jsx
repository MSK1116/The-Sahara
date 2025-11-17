"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Create_form from "../../create/Create_form";
import Create_navigator from "../../create/Create_navigator";
import toast from "react-hot-toast";

const Browser_wrapper = ({ LMSIN }) => {
  const [applicantData, setApplicantData] = useState(null);
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState({});
  const [form3Data, setForm3Data] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleDataFetch();
  }, [LMSIN]);

  const handleDataFetch = async () => {
    setLoading(true);

    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN: LMSIN });
      if (temp.data) {
        setApplicantData(temp.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applicant data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const aggregated = {
      form1: form1Data,
      form2: form2Data,
      form3: form3Data,
    };
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
    } catch (error) {
      console.error(error);
      // The toast.promise will handle showing the error message.
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
    setCurrentPage(pageNumber);
  };

  return (
    <main className="flex flex-row">
      <div className="w-[90%]">
        {applicantData ? (
          <>
            {currentPage === 1 && <Create_form initialData={applicantData?.form1} onDataChange={setForm1Data} />}
            {currentPage === 2 && <div className="p-10">Page 2 is under construction.</div>}
            {currentPage === 3 && <div className="p-10">Page 3 is under construction.</div>}
            {currentPage === 4 && <div className="p-10">Page 4 is under construction.</div>}
            {currentPage === 5 && <div className="p-10">Page 5 is under construction.</div>}
          </>
        ) : (
          <div className="w-full text-center p-10">Applicant not found.</div>
        )}
      </div>
      <div className="flex-1">
        <Create_navigator currentPage={currentPage} handleFormPage={handleFormPage} LMSIN={LMSIN} data={form1Data} onSave={handleSave} isEditing={true} />
      </div>
    </main>
  );
};

export default Browser_wrapper;
