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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AreaInput from "@/components/AreaInput";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

export default function Table7_copy_for_form2({ onDataChange, localData, initialData }) {
  const initialRow = {
    id: Date.now(),
    ownerName: "",
    province: "",
    district: "",
    palika: "",
    wardNo: "",
    tole: "",
    sheetNo: "",
    plotNo: "",
    area: "",
    landType: "",
  };

  const [rows, setRows] = useState(initialData || [initialRow]);

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
      <p className="font-bold my-5">धितोको विवरण :-</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">धनीको नाम</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">प्रदेश</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">जिल्ला</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">पालिका</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">वडा नं</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">टोल / बाटो</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">कि.न</th>
              <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">क्षेत्रफल</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">जग्गाको किसिम:</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border p-2">
                  <Input disabled readOnly value={index + 1} />
                </td>
                <td className="border p-2">
                  <Select disabled readOnly value={row.ownerName || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="धनीको नाम"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {localData.applicant_name && <SelectItem value={localData.applicant_name}>{localData.applicant_name}</SelectItem>}
                      {localData.approver_applicant_name && <SelectItem value={localData.approver_applicant_name}>{localData.approver_applicant_name}</SelectItem>}{" "}
                    </SelectContent>
                  </Select>
                </td>

                {/* Province Dropdown */}
                <td className="border p-2">
                  <DropdownMenu disabled readOnly>
                    <DropdownMenuTrigger disabled readOnly className="w-full text-xs text-left border px-2 py-1 rounded-md">
                      {row.province || "प्रदेश चयन गर्नुहोस्"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup value={row.province || ""}>
                        {allProvinces.map((p) => (
                          <DropdownMenuRadioItem key={p.name} value={p.name}>
                            {p.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                {/* District Dropdown */}
                <td className="border p-2">
                  <DropdownMenu disabled readOnly>
                    <DropdownMenuTrigger disabled readOnly className="w-full text-xs text-left border px-2 py-1 rounded-md">
                      {row.district || "जिल्ला चयन गर्नुहोस्"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup value={row.district} onValueChange={(val) => handleInputChange(row.id, "district", val)}>
                        {getDistricts(row.province).map((d) => (
                          <DropdownMenuRadioItem key={d.name} value={d.name}>
                            {d.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                {/* Palika Dropdown */}
                <td className="border p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger disabled readOnly className="w-full text-xs text-left border px-2 py-1 rounded-md">
                      {row.palika || "पालिका चयन गर्नुहोस्"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup value={row.palika || ""}>
                        {getPalikas(row.province, row.district).map((p) => (
                          <DropdownMenuRadioItem key={p} value={p}>
                            {p}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                <td className="border p-2">
                  <Input disabled readOnly value={row.wardNo || ""} placeholder="वडा नं" />
                </td>
                <td className="border p-2">
                  <Input disabled readOnly value={row.tole || ""} placeholder="टोल / बाटो" />
                </td>
                <td className="border p-2">
                  <Input disabled readOnly value={row.sheetNo || ""} placeholder="सि.न" />
                </td>
                <td className="border p-2">
                  <Input disabled readOnly value={row.plotNo || ""} placeholder="कि.न" />
                </td>
                <td className="border p-2">
                  <AreaInput disabled={true} readOnly value={row.area || ""} />
                </td>
                <td className="border p-2 w">
                  <Select value={row.landType} onValueChange={(value) => handleInputChange(row.id, "landType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="किसिम"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="अवल">अवल</SelectItem>
                      <SelectItem value="दोयम">दोयम</SelectItem>
                      <SelectItem value="सीम">सीम</SelectItem>
                      <SelectItem value="घडेरी">घडेरी</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
