"use client";

import React from "react";
import { NepaliDatePicker as NDPicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

const NepaliDateInput = ({ value, onChange, className, inputClassName, options, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1 ${className || ""}`}>
      <NDPicker
        value={value}
        onChange={onChange}
        inputClassName={`border px-3 py-1.5 rounded-md w-full ${inputClassName || ""}`}
        options={
          options || {
            calenderLocale: "ne",
            valueLocale: "en",
          }
        }
        {...props}
      />
    </div>
  );
};

export default NepaliDateInput;
