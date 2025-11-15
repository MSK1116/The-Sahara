"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const columns = ["सि. न", "कर्जा सुविधा", "रकम", "भुक्तानी अवधि", "कैफियत"];

const Table1 = ({ onDataChange }) => {
  // Only one row
  const [row, setRow] = useState({
    "कर्जा सुविधा": "",
    रकम: "",
    "भुक्तानी अवधि": "",
    कैफियत: "",
  });

  useEffect(() => {
    if (onDataChange) onDataChange([row]);
  }, [row, onDataChange]);

  // refs for inputs
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

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
                <th key={col} className="px-4 py-2 text-left text-sm text-gray-700 font-semibold border-b">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-2 py-1 border-b">
                <Input className="w-full bg-gray-100 cursor-not-allowed" value={1} readOnly />
              </td>
              <td className="px-2 py-1 border-b">
                <Input className="w-full" placeholder="कर्जा सुविधा" value={row["कर्जा सुविधा"]} onChange={(e) => setRow((r) => ({ ...r, "कर्जा सुविधा": e.target.value }))} onKeyDown={(e) => handleEnter(e, 0)} ref={inputRefs[0]} />
              </td>
              <td className="px-2 py-1 border-b">
                <Input className="w-full" placeholder="रकम" value={row["रकम"]} onChange={(e) => setRow((r) => ({ ...r, रकम: e.target.value }))} onKeyDown={(e) => handleEnter(e, 1)} ref={inputRefs[1]} />
              </td>
              <td className="px-2 py-1 border-b">
                <Input className="w-full" placeholder="भुक्तानी अवधि" value={row["भुक्तानी अवधि"]} onChange={(e) => setRow((r) => ({ ...r, "भुक्तानी अवधि": e.target.value }))} onKeyDown={(e) => handleEnter(e, 2)} ref={inputRefs[2]} />
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
