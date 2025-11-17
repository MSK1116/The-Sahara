"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import convert from "number-to-nepali-words";
const topics = ["तलब", "व्यवसाय", "घरभाडा", "कृषि", "लगानी", "अन्य"];

export default function Table3({ onDataChange, initialData }) {
  // Initialize rows with fixed topics
  const initialRows = topics.map((topic, idx) => ({
    id: idx,
    title: topic,
    debtorIncome: initialData?.rows?.find((r) => r.title === topic)?.debtorIncome || "",
    familyAnnualIncome: initialData?.rows?.find((r) => r.title === topic)?.familyAnnualIncome || "",
    notes: initialData?.rows?.find((r) => r.title === topic)?.notes || "",
  }));

  const [rows, setRows] = useState(initialRows);
  const [totalDebtor, setTotalDebtor] = useState(0);
  const [totalFamily, setTotalFamily] = useState(0);

  const handleInputChange = (id, field, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  // Calculate totals whenever rows change
  useEffect(() => {
    let debtorSum = 0;
    let familySum = 0;
    rows.forEach((row) => {
      debtorSum += parseFloat(convert(row.debtorIncome, "toEn")) || 0;
      familySum += parseFloat(convert(row.familyAnnualIncome, "toEn")) || 0;
    });
    setTotalDebtor(debtorSum);
    setTotalFamily(familySum);

    onDataChange &&
      onDataChange({
        rows,
        totalDebtor: convert(debtorSum, "toNp"),
        totalFamily: convert(familySum, "toNp"),
      });
  }, [rows, onDataChange]);

  const handleEnterFocus = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const table = e.currentTarget.closest("table");
      if (!table) return;

      // Only inputs, skip buttons or dropdown triggers
      const focusableInputs = Array.from(table.querySelectorAll("input:not([disabled])"));

      const index = focusableInputs.indexOf(e.currentTarget);
      if (index > -1 && index + 1 < focusableInputs.length) {
        focusableInputs[index + 1].focus();
      }
    }
  }, []);
  return (
    <div className="overflow-x-auto mt-5">
      <p className="font-bold my-5">ऋणीको वार्षिक आम्दानी र एकाघर परिवारको वार्षिक आय :-</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 w-4 text-left text-sm text-gray-700 font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">शीषक</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">ऋणीको वार्षिक आम्दानी</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">एकाघर परिवारको वार्षिक आय</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">कैफियत</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border p-2">
                  <Input disabled readOnly value={index + 1} />
                </td>
                <td className="border p-2">
                  <Input disabled readOnly value={row.title} />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.debtorIncome || ""} onChange={(e) => handleInputChange(row.id, "debtorIncome", convert(e.target.value, "toNp"))} placeholder="ऋणीको वार्षिक आम्दानी" />
                </td>
                <td className="border p-2">
                  <Input
                    onKeyDown={handleEnterFocus}
                    value={row.familyAnnualIncome || ""}
                    onChange={(e) => {
                      const nepaliValue = convert(e.target.value, "toNp");
                      handleInputChange(row.id, "familyAnnualIncome", nepaliValue);
                    }}
                    placeholder="एकाघर परिवारको वार्षिक आय"
                  />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.notes} onChange={(e) => handleInputChange(row.id, "notes", e.target.value)} placeholder="कैफियत" />
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td className="border p-2 text-sm text-right" colSpan={2}>
                जम्मा (Total)
              </td>
              <td className="border p-2">
                <Input disabled readOnly value={convert(totalDebtor, "toNp")} />
              </td>
              <td className="border p-2">
                <Input disabled readOnly value={convert(totalFamily, "toNp")} />
              </td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
