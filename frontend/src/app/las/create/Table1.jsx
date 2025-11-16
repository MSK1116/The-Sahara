"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const columns = ["सि. न", "कर्जा सुविधा", "रकम", "भुक्तानी अवधि", "कैफियत"];

const Table1 = ({ onDataChange, amount, applicantType }) => {
  // Only one row
  const [row, setRow] = useState({
    "भुक्तानी अवधि": "",
    कैफियत: "",
  });

  useEffect(() => {
    if (onDataChange) onDataChange([row]);
  }, [row, onDataChange]);

  // refs for inputs
  const inputRefs = [useRef(), useRef()];

  // handle Enter key navigation
  const handleEnter = (e, idx) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (idx < inputRefs.length - 1) {
        inputRefs[idx + 1].current?.focus();
      }
    }
  };

  return (
    <div className="w-full mt-5">
      <div className="overflow-x-auto border rounded-md shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-2 text-left text-sm max-w-fit w-fit text-gray-700 font-semibold border-b">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-2 py-1 border-b">
                <Input disabled className="w-full bg-gray-100 " value={1} readOnly />
              </td>
              <td className="px-2 py-1 border-b">
                <Input disabled readOnly className="w-full" placeholder="कर्जा सुविधा" value={applicantType} onKeyDown={(e) => handleEnter(e, 0)} ref={inputRefs[0]} />
              </td>
              <td className="px-2 py-1 border-b">
                <Input disabled readOnly className="w-full" placeholder="रकम" value={amount} onKeyDown={(e) => handleEnter(e, 1)} ref={inputRefs[1]} />
              </td>
              <td className="px-2 py-1 border-b">
                <DropdownMenu>
                  <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full text-sm">{row["भुक्तानी अवधि"] || "भुक्तानी अवधि चयन गर्नुहोस्"}</DropdownMenuTrigger>

                  <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
                    <DropdownMenuRadioGroup value={row["भुक्तानी अवधि"]} onValueChange={(val) => setRow((r) => ({ ...r, "भुक्तानी अवधि": val }))}>
                      {Array.from({ length: 7 }).map((_, i) => {
                        const year = `${i + 1} वर्ष`;
                        return (
                          <DropdownMenuRadioItem key={year} value={year}>
                            {year}
                          </DropdownMenuRadioItem>
                        );
                      })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
              <td className="px-2 py-1 border-b">
                <Input className="w-full" placeholder="कैफियत" value={row["कैफियत"]} onChange={(e) => setRow((r) => ({ ...r, कैफियत: e.target.value }))} onKeyDown={(e) => handleEnter(e, 3)} ref={inputRefs[3]} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table1;
