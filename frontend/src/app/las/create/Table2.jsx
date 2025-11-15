"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

const relationsList = ["पिता", "आमा", "दाजु", "भाइ", "दिदी", "बहिनी", "छोरा", "छोरी", "ससुर", "सासु"];

const educationList = ["नपढेको", "१–६", "८–९", "१०", "+२", "Bachelor", "Master", "PhD"];

export default function Table2({ onDataChange }) {
  const initialRow = {
    id: Date.now(),
    name: "",
    address: "",
    relation: "",
    age: "",
    education: "",
    profession: "",
  };

  const [rows, setRows] = useState([initialRow]);

  const handleAddRow = () => {
    if (rows.length < 8) {
      setRows([...rows, { ...initialRow, id: Date.now() + Math.random() }]);
    }
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
    onDataChange && onDataChange(newRows);
  };

  return (
    <div className="overflow-x-auto mt-5">
      <p className="font-bold my-5">सगोलमा रहेको नातेदारहरुको विवरण :-</p>
      <div className="border shadow-sm rounded-md">
        <table className="table-auto border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 w-4 text-left text-sm text-gray-700 font-semibold border">सि.न</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">नाम</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">ठेगाना</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">नाता</th>
              <th className="px-4 py-2 w-20 text-left text-sm text-gray-700 font-semibold border">उमेर</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">शैक्षिक योग्यता</th>
              <th className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border">पेसा </th>
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
                  <Input id={`name-${row.id}`} value={row.name} onChange={(e) => handleInputChange(row.id, "name", e.target.value)} placeholder="नाम" />
                </td>
                <td className="border p-2">
                  <Input id={`address-${row.id}`} value={row.address} onChange={(e) => handleInputChange(row.id, "address", e.target.value)} placeholder="ठेगाना" />
                </td>
                <td className="border p-2">
                  {/* Relation Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full text-left">
                        {row.relation || "नाता चयन गर्नुहोस्"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuRadioGroup value={row.relation} onValueChange={(val) => handleInputChange(row.id, "relation", val)}>
                        {relationsList.map((relation, i) => (
                          <DropdownMenuRadioItem key={i} value={relation}>
                            {relation}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="border p-2">
                  <Input id={`age-${row.id}`} value={row.age} onChange={(e) => handleInputChange(row.id, "age", e.target.value)} placeholder="उमेर" />
                </td>
                <td className="border p-2">
                  {/* Education Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full text-left">
                        {row.education || "शैक्षिक योग्यता चयन गर्नुहोस्"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuRadioGroup value={row.education} onValueChange={(val) => handleInputChange(row.id, "education", val)}>
                        {educationList.map((edu, i) => (
                          <DropdownMenuRadioItem key={i} value={edu}>
                            {edu}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="border p-2">
                  <Input id={`profession-${row.id}`} value={row.profession} onChange={(e) => handleInputChange(row.id, "profession", e.target.value)} placeholder="पेसा" />
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
        <Button type="button" onClick={handleAddRow} disabled={rows.length >= 8}>
          Add More Row
        </Button>
      </div>
    </div>
  );
}
