"use client";
import React, { useEffect, useState } from "react";
import Create_form from "./Create_form";
import Create_navigator from "./Create_navigator";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Create_form2 from "./Create_form2";
const CreateWrapper = () => {
  const router = useRouter();
  const [form1Data, setForm1Data] = useState({});
  const [form2Data, setForm2Data] = useState({});
  const [form3Data, setForm3Data] = useState({});
  const [Lmsin, setLmsin] = useState("");
  const [isUpserting, setIsUpserting] = useState(false);
  const [dataFromServer, setDataFromServer] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [localData, setLocalData] = useState({});

  const handleUpsert = async () => {
    const aggregated = {
      form1: form1Data,
      form2: form2Data,
      form3: form3Data,
    };
    if (!Lmsin) {
      window.alert("LMSIN is not generated yet!");
      return false;
    }
    try {
      setIsUpserting(true);
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/upsert`, { ...aggregated, LMSIN: Lmsin });
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
      return false; // Indicate failure
    }
  };

  const getLMSIN = async () => {
    try {
      const LMSIN = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/las/getLmsin`);
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
        <div className="w-[90%]">
          {currentPage === 1 && <Create_form onDataChange={setForm1Data} />}
          {currentPage === 2 && <Create_form2 LMSIN={Lmsin} onDataChange={setForm2Data} />}
          {currentPage === 3 && <div className="p-10">Page 3 is under construction.</div>}
          {currentPage === 4 && <div className="p-10">Page 4 is under construction.</div>}
          {currentPage === 5 && <div className="p-10">Page 5 is under construction.</div>}
        </div>
        <div className="flex-1 ">
          <Create_navigator currentPage={currentPage} handleFormPage={handleFormPage} isUpserting={isUpserting} LMSIN={Lmsin} data={dataFromServer} onSave={handleUpsert} />
        </div>
      </main>
    </>
  );
};

export default CreateWrapper;
