"use client";
import React, { useEffect, useState } from "react";
import { GrUserFemale } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { GiPearlNecklace } from "react-icons/gi";

const GenderAndMale_status = ({ onDataChange, gender: initialGender, maritalStatus: initialMarital }) => {
  const [gender, setGender] = useState(initialGender || "male");
  const [marital, setMarital] = useState(initialMarital || "single");

  useEffect(() => {
    onDataChange({ gender, marital });
  }, [gender, marital]);

  return (
    <div className="flex flex-row mt-5.5 space-x-3 items-center justify-center">
      {/* Male */}
      <div title="पुरुष चयन गर्नुहोस्" onClick={() => setGender("male")} className={`${gender === "male" && "bg-blue-500 text-white border-white"} p-2.5 rounded-md border border-gray-400`}>
        <FaRegUser />
      </div>

      {/* Female */}
      <div title="महिला चयन गर्नुहोस्" onClick={() => setGender("female")} className={`${gender === "female" && "bg-blue-500 text-white border-white"} p-2.5 rounded-md border border-gray-400`}>
        <GrUserFemale />
      </div>

      {/* Marital Status */}
      <div
        title="वैवाहिक स्थिति परिवर्तन गर्नुहोस् (अविवाहित / विवाहित)"
        onClick={() => setMarital(marital === "single" ? "married" : "single")}
        className={`${marital === "married" && "bg-blue-500 text-white border-white"} p-2.5 rounded-md border border-gray-400`}>
        <GiPearlNecklace />
      </div>
    </div>
  );
};

export default GenderAndMale_status;
