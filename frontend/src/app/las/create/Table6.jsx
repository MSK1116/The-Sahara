"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NepaliDateInput from "@/components/NepaliDatePicker";

export default function Table6({ onDataChange, localData, initialData }) {
  const initialRow = {
    id: Date.now(),
    borrowerName: "",
    loanNo: "",
    miNo: "",
    approvedAmount: "",
    remainingAmount: "",
    startDate: "",
    remarks: "",
  };

  const [rows, setRows] = useState(initialData || [initialRow]);

  const handleAddRow = () => {
    if (rows.length < 3) {
      setRows([...rows, { ...initialRow, id: Date.now() + Math.random() }]);
    }
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    const newRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
    setRows(newRows);
    onDataChange && onDataChange(newRows);
  };

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
      <p className="font-bold my-5">ऋणी वा परिवारले यस संस्थाबाट गरेको कारोबार :-</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 w-4 text-left text-sm text-gray-700 font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">ऋणीको नाम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">कर्जा नं</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">मि न.</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">स्वीकृत रकम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">तिर्न बाँकी रकम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">कारोबार सुरु गरेको मिति</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">कैफियत</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">#</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border p-2">
                  <Input disabled readOnly value={index + 1} />
                </td>
                <td className="border p-2">
                  <Select value={row.borrowerName} onValueChange={(value) => handleInputChange(row.id, "borrowerName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="ऋणीको नाम" />
                    </SelectTrigger>
                    <SelectContent>
                      {localData?.table2?.map((i) => (
                        <SelectItem key={i.id} value={i.name || "-"}>
                          {i.name || "-"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.loanNo} onChange={(e) => handleInputChange(row.id, "loanNo", e.target.value)} placeholder="कर्जा नं" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.miNo} onChange={(e) => handleInputChange(row.id, "miNo", e.target.value)} placeholder="मि न." />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.approvedAmount} onChange={(e) => handleInputChange(row.id, "approvedAmount", e.target.value)} placeholder="स्वीकृत रकम" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.remainingAmount} onChange={(e) => handleInputChange(row.id, "remainingAmount", e.target.value)} placeholder="तिर्न बाँकी रकम" />
                </td>
                <td className="border p-2">
                  <NepaliDateInput onKeyDown={handleEnterFocus} value={row.startDate || ""} className="w-full mt-2" onChange={(e) => handleInputChange(row.id, "startDate", e.target.value)} />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.remarks} onChange={(e) => handleInputChange(row.id, "remarks", e.target.value)} placeholder="कैफियत" />
                </td>
                <td className="border p-2 text-center">
                  {index > 0 && (
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteRow(row.id)}>
                      <MdDelete />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <Button type="button" onClick={handleAddRow} disabled={rows.length >= 3}>
          Add More Row
        </Button>
      </div>
    </div>
  );
}
