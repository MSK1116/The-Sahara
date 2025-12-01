"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import convert from "number-to-nepali-words";
import Province1JSON from "@/asset/Province1.json";
import Province2JSON from "@/asset/Province2.json";
import Province3JSON from "@/asset/Province3.json";
import Province4JSON from "@/asset/Province4.json";
import Province5JSON from "@/asset/Province5.json";
import Province6JSON from "@/asset/Province6.json";
import Province7JSON from "@/asset/Province7.json";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AreaInput from "@/components/AreaInput";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

export default function Table7({ onDataChange, localData, initialData }) {
  const initialRow = {
    id: Date.now(),
    ownerName: "",
    district: "",
    palika: "",
    wardNo: "",
    tole: "",
    sheetNo: "",
    plotNo: "",
    area: "",
    charKila: "",
    estimatedValue: "",
    remarks: "",
  };

  const [rows, setRows] = useState(initialData || [initialRow]);
  const allDistricts = allProvinces.flatMap((p) => p.districts.map((d) => d.name));
  const handleAddRow = () => {
    if (rows.length < 7) {
      setRows([...rows, { ...initialRow, id: Date.now() + Math.random() }]);
    }
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    const newRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
    setRows(newRows);
  };

  useEffect(() => {
    onDataChange && onDataChange(rows);
  }, [rows]);

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
      <p className="font-bold my-5">धितोको विवरण :-</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">धनीको नाम</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">जिल्ला</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">गा.वि.स. / न.पा. </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">वडा नं</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">टोल / बाटो</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">कि.न</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">क्षेत्रफल</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">चार किला</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">अनुमानित मूल्य</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">कैफियत</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">#</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border p-2">
                  <Input disabled readOnly value={index + 1} />
                </td>
                <td className="border p-2">
                  <Select value={row.ownerName || ""} onValueChange={(value) => handleInputChange(row.id, "ownerName", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="धनीको नाम"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {localData.applicant_name && <SelectItem value={localData.applicant_name}>{localData.applicant_name}</SelectItem>}
                      {localData.approver_applicant_name && <SelectItem value={localData.approver_applicant_name}>{localData.approver_applicant_name}</SelectItem>}{" "}
                    </SelectContent>
                  </Select>
                </td>
                {/* District Dropdown */}
                <td className="border p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full text-xs text-left border px-2 py-1 rounded-md">{row.district || "जिल्ला चयन गर्नुहोस्"}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup onKeyDown={handleEnterFocus} value={row.district || ""} onValueChange={(val) => handleInputChange(row.id, "district", val)}>
                        {allDistricts.map((d, index) => (
                          <DropdownMenuRadioItem key={d + index + "457"} value={d}>
                            {d}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.palika || ""} onChange={(e) => handleInputChange(row.id, "palika", e.target.value)} placeholder="पालिका" />
                </td>

                <td className="border p-2">
                  <Input
                    onKeyDown={handleEnterFocus}
                    value={row.wardNo || ""}
                    onChange={(e) => {
                      const val = convert(e.target.value, "toNp");
                      handleInputChange(row.id, "wardNo", val);
                    }}
                    placeholder="वडा नं"
                  />
                </td>
                {/* tole */}
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.tole || ""} onChange={(e) => handleInputChange(row.id, "tole", e.target.value)} placeholder="टोल / बाटो" />
                </td>
                {/* sheetNo */}
                <td className="border p-2">
                  <Input
                    onKeyDown={handleEnterFocus}
                    value={row.sheetNo || ""}
                    onChange={(e) => {
                      const val = convert(e.target.value, "toNp");
                      handleInputChange(row.id, "sheetNo", val);
                    }}
                    placeholder="सि.न"
                  />
                </td>
                <td className="border p-2">
                  <Input
                    onKeyDown={handleEnterFocus}
                    value={row.plotNo || ""}
                    onChange={(e) => {
                      const val = convert(e.target.value, "toNp");
                      handleInputChange(row.id, "plotNo", val);
                    }}
                    placeholder="कि.न"
                  />
                </td>
                <td className="border p-2">
                  <AreaInput value={row.area || ""} onChange={(val) => handleInputChange(row.id, "area", val)} />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.charKila || ""} onChange={(e) => handleInputChange(row.id, "charKila", e.target.value)} placeholder="चार किला" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.estimatedValue || ""} onChange={(e) => handleInputChange(row.id, "estimatedValue", e.target.value)} placeholder="अनुमानित मूल्य" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.remarks || ""} onChange={(e) => handleInputChange(row.id, "remarks", e.target.value)} placeholder="कैफियत" />
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
        <Button type="button" onClick={handleAddRow} disabled={rows.length >= 7}>
          Add More Row
        </Button>
      </div>
    </div>
  );
}
