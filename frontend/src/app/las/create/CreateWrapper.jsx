"use client";
import React, { useState } from "react";
import Create_form from "./Create_form";
import Create_navigator from "./Create_navigator";

const CreateWrapper = () => {
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState(null);
  const [form3Data, setForm3Data] = useState(null);

  const handleCollectAll = () => {
    const aggregated = {
      form1: form1Data,
      form2: form2Data,
      form3: form3Data,
    };
    // For now just print to console; could be sent to API
    // JSON.stringify used to make it easy to inspect nested objects
    console.log("Aggregated form data:", JSON.stringify(aggregated, null, 2));
    alert("Aggregated form data logged to console (see DevTools)");
  };

  return (
    <>
      <main className="flex flex-row flex-1">
        <div className="w-[90%] overflow-y-auto">
          <Create_form onDataChange={setForm1Data} />
        </div>
        <div className="flex-1 ">
          <Create_navigator data={form1Data} onSave={handleCollectAll} />
        </div>
      </main>
    </>
  );
};

export default CreateWrapper;
