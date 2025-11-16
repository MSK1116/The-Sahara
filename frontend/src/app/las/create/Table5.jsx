"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Table5({ onDataChange, localData }) {
  const initialRow = {
    id: Date.now(),
    borrowerName: "",
    bankName: "",
    loanType: "",
    approvedAmount: "",
    remainingAmount: "",
    remarks: "",
  };

  const [rows, setRows] = useState([initialRow]);

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
      <p className="font-bold my-5">ऋणी वा परिवारले अन्य बैंक/वित्तीय संस्थाबाट गरेको कारोबार :-</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 w-4 text-left text-sm text-gray-700 font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">ऋणीको नाम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">बैंकको नाम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">कर्जा सुविधा</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">स्वीकृत रकम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">तिर्न बाँकी रकम</th>
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
                      {localData.table2?.map((item) => (
                        <SelectItem key={item.id} value={item.name || "-"}>
                          {item.name || "-"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.bankName} onChange={(e) => handleInputChange(row.id, "bankName", e.target.value)} placeholder="बैंकको नाम" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.loanType} onChange={(e) => handleInputChange(row.id, "loanType", e.target.value)} placeholder="कर्जा सुविधा" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.approvedAmount} onChange={(e) => handleInputChange(row.id, "approvedAmount", e.target.value)} placeholder="स्वीकृत रकम" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.remainingAmount} onChange={(e) => handleInputChange(row.id, "remainingAmount", e.target.value)} placeholder="तिर्न बाँकी रकम" />
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
