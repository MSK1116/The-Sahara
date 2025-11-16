"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Create_form from "../../create/Create_form";
import Create_navigator from "../../create/Create_navigator";
import toast from "react-hot-toast";

const Browser_wrapper = ({ LMSIN }) => {
  const [applicantData, setApplicantData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleDataFetch();
  }, [LMSIN]);

  const handleDataFetch = async () => {
    setLoading(true);
    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN: LMSIN });
      if (temp.data) {
        setApplicantData(temp.data);
        setFormData(temp.data); // Initialize the live form data
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applicant data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData) {
      toast.error("No data to save.");
      return;
    }
    try {
      const promise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/upsert`, { ...formData, LMSIN: LMSIN });
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
    return <div className="w-full text-center p-10">Loading applicant data...</div>;
  }

  return (
    <main className="flex flex-row">
      <div className="w-[90%]">{applicantData ? <Create_form initialData={applicantData} onDataChange={setFormData} /> : <div className="w-full text-center p-10">Applicant not found.</div>}</div>
      <div className="flex-1">
        <Create_navigator LMSIN={LMSIN} data={formData} onSave={handleSave} isEditing={true} />
      </div>
    </main>
  );
};

export default Browser_wrapper;
