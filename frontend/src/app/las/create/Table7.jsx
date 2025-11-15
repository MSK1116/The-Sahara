"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

import Province1JSON from "../create/Province1.json";
import Province2JSON from "../create/Province2.json";
import Province3JSON from "../create/Province3.json";
import Province4JSON from "../create/Province4.json";
import Province5JSON from "../create/Province5.json";
import Province6JSON from "../create/Province6.json";
import Province7JSON from "../create/Province7.json";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

export default function Table7({ onDataChange, handleEnterFocus }) {
  const initialRow = {
    id: Date.now(),
    ownerName: "",
    province: "",
    district: "",
    palika: "",
    wardNo: "",
    tole: "",
    serialNo: "",
    plotNo: "",
    area: "",
    charKila: "",
    estimatedValue: "",
    remarks: "",
  };

  const [rows, setRows] = useState([initialRow]);

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

  return (
    <div className="overflow-x-auto mt-5">
      <p className="font-bold my-5">धितोको विवरण :-</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">धनीको नाम</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">प्रदेश</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">जिल्ला</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border">पालिका</th>
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
                  <Input onKeyDown={handleEnterFocus} value={row.ownerName} onChange={(e) => handleInputChange(row.id, "ownerName", e.target.value)} placeholder="धनीको नाम" />
                </td>

                {/* Province Dropdown */}
                <td className="border p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full text-xs text-left border px-2 py-1 rounded-md">{row.province || "प्रदेश चयन गर्नुहोस्"}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup onKeyDown={handleEnterFocus} value={row.province} onValueChange={(val) => handleInputChange(row.id, "province", val)}>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full text-xs text-left border px-2 py-1 rounded-md">{row.district || "जिल्ला चयन गर्नुहोस्"}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup onKeyDown={handleEnterFocus} value={row.district} onValueChange={(val) => handleInputChange(row.id, "district", val)}>
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
                    <DropdownMenuTrigger className="w-full text-xs text-left border px-2 py-1 rounded-md">{row.palika || "पालिका चयन गर्नुहोस्"}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup onKeyDown={handleEnterFocus} value={row.palika} onValueChange={(val) => handleInputChange(row.id, "palika", val)}>
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
                  <Input onKeyDown={handleEnterFocus} value={row.wardNo} onChange={(e) => handleInputChange(row.id, "wardNo", e.target.value)} placeholder="वडा नं" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.tole} onChange={(e) => handleInputChange(row.id, "tole", e.target.value)} placeholder="टोल / बाटो" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.serialNo} onChange={(e) => handleInputChange(row.id, "serialNo", e.target.value)} placeholder="सि.न" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.plotNo} onChange={(e) => handleInputChange(row.id, "plotNo", e.target.value)} placeholder="कि.न" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.area} onChange={(e) => handleInputChange(row.id, "area", e.target.value)} placeholder="क्षेत्रफल" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.charKila} onChange={(e) => handleInputChange(row.id, "charKila", e.target.value)} placeholder="चार किला" />
                </td>
                <td className="border p-2">
                  <Input onKeyDown={handleEnterFocus} value={row.estimatedValue} onChange={(e) => handleInputChange(row.id, "estimatedValue", e.target.value)} placeholder="अनुमानित मूल्य" />
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
        <Button type="button" onClick={handleAddRow} disabled={rows.length >= 7}>
          Add More Row
        </Button>
      </div>
    </div>
  );
}
