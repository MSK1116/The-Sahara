import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AreaInput from "@/components/AreaInput";
import convert from "number-to-nepali-words";
const TableLandEvaluation_and_calculator = ({ initialData, onDataChange, handleFiftyPercent, handleEnterFocus }) => {
  const initialRow = {
    id: Date.now(),
    wardNo: "",
    plotNo: "",
    area: "",
    govApprovedPrice: "",
    localApprovedPrice: "",
  };
  const [rows, setRows] = useState(initialData || [initialRow]);
  const calculateKatha = (area) => {
    if (!area) return 0;

    const parts = area.split("-").map((part) => Number(convert(part, "toEn")));
    if (parts.length === 1) return parts[0];
    if (parts.length === 4) {
      const [A, B, C, D] = parts;
      return A * 20 + B + C / 20 + D / (20 * 16);
    }
    return 0;
  };
  const handleInputChange = (rowIndex, field, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex] = {
        ...newRows[rowIndex],
        [field]: value,
      };
      if (onDataChange) onDataChange(newRows);
      return newRows;
    });
  };

  const grandTotal = rows.reduce((sum, row) => {
    const katha = calculateKatha(row.area);
    const total = (Number(row.govApprovedPrice) || 0) * katha + (Number(row.localApprovedPrice) || 0) * katha;
    return sum + total;
  }, 0);

  useEffect(() => {
    if (handleFiftyPercent) {
      handleFiftyPercent(grandTotal);
    }
  }, [grandTotal]);
  return (
    <>
      <div className="my-5 font-bold">जग्गाको मूल्याङ्कन:-</div>
      <table className="table-auto border-collapse border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">सि.न</th>
            <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">वडा नं</th>
            <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">कि.न</th>
            <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">क्षेत्रफल</th>
            <th className="px-4 py-2 text-left  text-sm font-semibold border">नेपाल सरकार वा निकायले तोकेको मूल्य प्रतिकठ्ठा</th>
            <th className="px-4 py-2 text-left  text-sm font-semibold border">चलन चल्तीको मूल्य प्रतिकठ्ठा</th>
            <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">जम्मा रकम</th>
            <th className="px-4 py-2 text-left text-gray-500 text-sm font-semibold border">÷ २ ले हुने रकम</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const katha = calculateKatha(row.area);
            const total = (Number(row.govApprovedPrice) || 0) * katha + (Number(row.localApprovedPrice) || 0) * katha;

            return (
              <tr key={row.id}>
                <td className="border p-2">
                  <Input disabled readOnly value={index + 1} />
                </td>
                <td className="border p-2">
                  <Input disabled readOnly value={row.wardNo || ""} placeholder="वडा नं" />
                </td>
                <td className="border p-2">
                  <Input disabled readOnly value={row.plotNo || ""} placeholder="कि.न" />
                </td>
                <td className="border p-2">
                  <AreaInput disabled={true} readOnly value={row.area || ""} />
                </td>
                <td title={katha || ""} className="border p-2">
                  <Input
                    value={row.govApprovedPrice || ""}
                    onKeyDown={handleEnterFocus}
                    onChange={(e) => {
                      const val = convert(e.target.value, "toEn");
                      handleInputChange(index, "govApprovedPrice", val);
                    }}
                    placeholder="नेपाल सरकार वा निकायले तोकेको मूल्य प्रतिकठ्ठा"
                  />
                </td>
                <td className="border p-2">
                  <Input
                    onKeyDown={handleEnterFocus}
                    value={row.localApprovedPrice || ""}
                    onChange={(e) => {
                      const val = convert(e.target.value, "toEn");
                      handleInputChange(index, "localApprovedPrice", val);
                    }}
                    placeholder="चलन चल्तीको मूल्य प्रतिकठ्ठा"
                  />
                </td>
                <td title={total || ""} className="border p-2">
                  <Input disabled readOnly value={total.toFixed(2) || ""} placeholder="कि.न" />
                </td>
                <td title={total / 2 || ""} className="border p-2">
                  <Input disabled readOnly value={(total / 2).toFixed(2) || ""} placeholder="कि.न" />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-gray-100">
            <td colSpan="6" className="text-right border px-2 py-1">
              जम्मा:
            </td>
            <td className="border px-2 py-1">{convert(grandTotal.toFixed(2), "toNp")}</td>
            <td className="border px-2 py-1">{convert(grandTotal.toFixed(2) / 2, "toNp")}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default TableLandEvaluation_and_calculator;
