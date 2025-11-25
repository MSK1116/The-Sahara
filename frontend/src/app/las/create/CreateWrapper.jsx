"use client";
import React, { useEffect, useState } from "react";
import Create_form from "./Create_form";
import Create_navigator from "./Create_navigator";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

const CreateWrapper = ({ sessionAuth0 }) => {
  const router = useRouter();

  const [Lmsin, setLmsin] = useState("");
  const [isUpserting, setIsUpserting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const user = jwt.decode(sessionAuth0?.tokenSet?.idToken);
  const [form1Data, setForm1Data] = useState({ branchType: user?.officerBranchType, branch: user?.officerBranch, branchCode: user?.officerBranchCode });

  const handleUpsert = async () => {
    const aggregated = {
      form1: form1Data,
    };
    if (!Lmsin) {
      window.alert("LMSIN is not generated yet!");
      return false;
    }
    try {
      setIsUpserting(true);
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/upsert`, { ...aggregated, LMSIN: Lmsin, databaseSlug: user?.databaseSlug });
      if (temp.data) {
        console.log(temp.data.data.form1);
        temp.data?.data.LMSIN && router.push(`/las/browse/${temp.data?.data.LMSIN}`);
        setIsUpserting(false); // Set loading to false on success
        return true; // Indicate success
      }
    } catch (error) {
      setIsUpserting(false);
      console.log(error);
      toast.error(error.response.data.message, { position: "top-left" });
      return false;
    }
  };

  const getLMSIN = async () => {
    try {
      const LMSIN = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getLmsin`, { databaseSlug: user?.databaseSlug });
      if (LMSIN.data) {
        setLmsin(LMSIN.data.lmsinNumber);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLMSIN();
  }, []);

  const handleFormPage = async (page) => {
    const success = await handleUpsert();
    if (success) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <main className="flex flex-row ">
        <div className="w-[90%]">{currentPage === 1 && <Create_form initialData={form1Data} onDataChange={setForm1Data} />}</div>
        <div className="flex-1 ">
          <Create_navigator currentPage={currentPage} handleFormPage={handleFormPage} isUpserting={isUpserting} LMSIN={Lmsin} onSave={handleUpsert} />
        </div>
      </main>
    </>
  );
};

export default CreateWrapper;
