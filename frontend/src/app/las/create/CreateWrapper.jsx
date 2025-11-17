"use client";
import React, { useEffect, useState } from "react";
import Create_form from "./Create_form";
import Create_navigator from "./Create_navigator";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const CreateWrapper = () => {
  const router = useRouter();
  const [form1Data, setForm1Data] = useState({});
  const [form2Data, setForm2Data] = useState({});
  const [form3Data, setForm3Data] = useState({});
  const [Lmsin, setLmsin] = useState("");
  const [isUpserting, setIsUpserting] = useState(false);
  const handleCollectAll = () => {
    const aggregated = {
      form1: form1Data,
      form2: form2Data,
      form3: form3Data,
    };
    handleUpsert();
  };

  const handleUpsert = async () => {
    if (!Lmsin) {
      window.alert("LMSIN is not generated yet!");
      return;
    }
    try {
      setIsUpserting(true);
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/upsert`, { ...form1Data, LMSIN: Lmsin });
      if (temp.data) {
        setIsUpserting(false);
        temp.data?.data.LMSIN && router.push(`/las/browse/${temp.data?.data.LMSIN}`);
      }
    } catch (error) {
      setIsUpserting(false);
      console.log(error);
      toast.error(error.response.data.message, { position: "top-left" });
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

  return (
    <>
      <main className="flex flex-row ">
        <div className="w-[90%]">
          <Create_form onDataChange={setForm1Data} />
        </div>
        <div className="flex-1 ">
          <Create_navigator isUpserting={isUpserting} LMSIN={Lmsin} data={form1Data} onSave={handleCollectAll} />
        </div>
      </main>
    </>
  );
};

export default CreateWrapper;
