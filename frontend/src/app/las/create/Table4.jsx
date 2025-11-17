"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

import Province1JSON from "@/asset/Province1.json";
import Province2JSON from "@/asset/Province2.json";
import Province3JSON from "@/asset/Province3.json";
import Province4JSON from "@/asset/Province4.json";
import Province5JSON from "@/asset/Province5.json";
import Province6JSON from "@/asset/Province6.json";
import Province7JSON from "@/asset/Province7.json";
import AreaInput from "@/components/AreaInput";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

export default function Table4({ onDataChange, localData, initialData }) {
  const allDistricts = allProvinces.flatMap((p) => p.districts.map((d) => d.name));
  const initialRow = {
    id: Date.now(),
    district: "",
    palika: "",
    wardNo: "",
    sheetNo: "",
    plotNo: "",
    area: "",
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

  const getDistricts = (provinceName) => {
    if (!provinceName) return [];
    const province = allProvinces.find((p) => p.name === provinceName);
    return province?.districts || [];
  };

  const getPalikas = (provinceName, districtName) => {
    if (!provinceName || !districtName) return [];
    const province = allProvinces.find((p) => p.name === provinceName);
    const district = province?.districts.find((d) => d.name === districtName);
    return district?.palikas || [];
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
      <p className="font-bold my-5">ऋणीको एकल परिवारको अचल सम्पत्तिको विनियोजन: -</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 w-4 text-left text-sm text-gray-700 font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">धनीको नाम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">जिल्ला</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">गा.वि.स./ न.पा. </th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">वडा न.</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">कि.न</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">क्षेत्रफल</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">कफियाक्त</th>
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
                  <Input value={localData.applicant_name} readOnly disabled />
                </td>

                {/* District Dropdown */}

                <td className="border p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full text-xs text-left border px-2 py-1 rounded-md">{row.district || "जिल्ला चयन गर्नुहोस्"}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup onKeyDown={handleEnterFocus} value={row.district} onValueChange={(val) => handleInputChange(row.id, "district", val)}>
                        {allDistricts.map((d) => (
                          <DropdownMenuRadioItem key={d} value={d}>
                            {d}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                {/* Palika Dropdown */}
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.palika || ""} onChange={(e) => handleInputChange(row.id, "palika", e.target.value)} placeholder="पालिका" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.wardNo || ""} onChange={(e) => handleInputChange(row.id, "wardNo", e.target.value)} placeholder="वडा न." />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.sheetNo || ""} onChange={(e) => handleInputChange(row.id, "sheetNo", e.target.value)} placeholder="सि.न" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.plotNo || ""} onChange={(e) => handleInputChange(row.id, "plotNo", e.target.value)} placeholder="कि.न" />
                </td>
                <td className="border p-2">
                  <AreaInput value={row.area || ""} onChange={(e) => handleInputChange(row.id, "area", e.target.value)} />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.remarks || ""} onChange={(e) => handleInputChange(row.id, "remarks", e.target.value)} placeholder="कफियाक्त" />
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
