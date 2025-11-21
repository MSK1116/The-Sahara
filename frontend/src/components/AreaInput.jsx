"use client";
import React, { useState, useRef, useEffect } from "react";

const AreaInput = ({ value = "", onChange, disabled = false }) => {
  const parts = value.split("-").filter((v) => v !== "");
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [isValid, setIsValid] = useState(true);

  // FIX: refs persist across renders
  const refs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  useEffect(() => {
    if (!value) return;

    const parts = value.split("-");
    const temp = ["", "", "", ""];

    if (parts.length === 1) {
      temp[3] = parts[0]; // Single input → last box only
    } else if (parts.length === 4) {
      parts.forEach((p, i) => (temp[i] = p));
    }

    setInputs(temp);
  }, []);

  const validate = (arr) => {
    const filled = arr.filter((x) => x !== "").length;

    if (filled === 1 && arr[3] !== "") {
      setIsValid(true);
      onChange(arr[3]);
      return;
    }

    if (filled === 4) {
      setIsValid(true);
      onChange(arr.join("-"));
      return;
    }

    setIsValid(false);
    onChange("");
  };

  const handleChange = (index, val) => {
    const cleanVal = val.replace(/\s/g, "");
    const newArr = [...inputs];
    newArr[index] = cleanVal;
    setInputs(newArr);
    validate(newArr);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && inputs[index] === "") {
      if (index > 0) refs.current[index - 1].current?.focus();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (index < 3) refs.current[index + 1].current?.focus();
      return;
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text");
    let parts = text.split("-");
    e.preventDefault();

    const next = ["", "", "", ""];

    if (parts.length === 1) {
      next[3] = parts[0];
    } else if (parts.length === 4) {
      for (let i = 0; i < 4; i++) next[i] = parts[i] || "";
    }

    setInputs(next);
    validate(next);
  };

  const baseClass = "w-7 h-9 text-center border rounded-md outline-none transition-all";
  const errorClass = isValid ? "border-gray-300 focus:ring focus:ring-blue-200" : "border-red-500 bg-red-50";

  return (
    <div className="flex items-center space-x-2">
      {inputs.map((val, index) => (
        <React.Fragment key={index}>
          <input
            disabled={disabled}
            title="क्षेत्रफल राख्नुहोस् (वर्ग कि.मी वा बिघा/कठ्ठा/धुर/कनमा)। एउटा मात्रै नम्बर राख्ने हो भने अन्तिम बाकसमा राख्नुहोस्।"
            ref={refs.current[index]}
            value={val || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            maxLength={3}
            className={`${baseClass} ${errorClass} ${disabled && "text-gray-500"}`}
          />
          {index < 3 && <span className="text-xs">-</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AreaInput;
