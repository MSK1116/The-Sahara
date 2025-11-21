"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Shadcn Input
import convert from "number-to-nepali-words";
export default function NepaliDateInput({ value, onChange, className = "", inputClassName = "", handleEnterFocus }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [errors, setErrors] = useState({ year: "", month: "", day: "" });

  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("-");
      setYear(y || "");
      setMonth(m || "");
      setDay(d || "");
    }
  }, [value]);

  const validate = (type, val) => {
    let msg = "";
    if (type === "year") {
      if (!/^\d{4}$/.test(val)) msg = "Year must be 4 digits";
    }
    if (type === "month") {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1 || num > 12) msg = "Month 1-12";
    }
    if (type === "day") {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < 1 || num > 32) msg = "Day 1-31";
    }
    setErrors((prev) => ({ ...prev, [type]: msg }));
  };

  const handleChange = (type, val) => {
    if (type === "year") setYear(val.slice(0, 4));
    if (type === "month") setMonth(val.slice(0, 2));
    if (type === "day") setDay(val.slice(0, 2));

    validate(type, val);

    if ((type === "year" ? /^\d{4}$/.test(val) : year.length === 4) && (type === "month" ? val >= 1 && val <= 12 : month >= 1 && month <= 12) && (type === "day" ? val >= 1 && val <= 31 : day >= 1 && day <= 31)) {
      onChange && onChange(`${type === "year" ? val : year}-${type === "month" ? val : month}-${type === "day" ? val : day}`);
    }
  };

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <div className="flex space-x-2">
        {/* Year */}
        <div className="flex flex-col">
          <Input
            onKeyDown={handleEnterFocus}
            type="text"
            placeholder="YYYY"
            value={year || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[\s\D]/g, "");
              handleChange("year", convert(val, "toEn"));
            }}
            className={inputClassName}
          />
          {errors.year && <span className="text-xs text-destructive mt-0.5">{errors.year}</span>}
        </div>

        {/* Month */}
        <div className="flex flex-col">
          <Input
            onKeyDown={handleEnterFocus}
            type="text"
            placeholder="MM"
            value={month || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[\s\D]/g, "");
              handleChange("month", convert(val, "toEn"));
            }}
            className={inputClassName}
          />
          {errors.month && <span className="text-xs text-destructive mt-0.5">{errors.month}</span>}
        </div>

        {/* Day */}
        <div className="flex flex-col">
          <Input
            onKeyDown={handleEnterFocus}
            type="text"
            placeholder="DD"
            value={day ?? ""}
            onChange={(e) => {
              const val = e.target.value.replace(/[\s\D]/g, "");
              handleChange("day", convert(val, "toEn"));
            }}
            className={inputClassName}
          />
          {errors.day && <span className="text-xs text-destructive mt-0.5">{errors.day}</span>}
        </div>
      </div>
    </div>
  );
}
