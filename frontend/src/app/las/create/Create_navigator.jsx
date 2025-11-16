"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { IoSaveSharp } from "react-icons/io5";
import { MdPrint } from "react-icons/md";
import { PageMaker_LoanApplicationPage1 } from "@/components/PageMaker/PageMaker_LoanApplicationPage1";

const Create_navigator = ({ onSave, data }) => {
  const handlePrint = () => {
    if (!data) return;

    const htmlContent = PageMaker_LoanApplicationPage1(data);

    const printWindow = window.open("", "_blank");

    if (!printWindow) return alert("Pop-up blocked");

    // Use document.open + write full HTML at once
    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
       <title>Print</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <style>
        @page {
            size: A4;
            margin: 10mm;
        }

        body {
            font-family: Poppins;
            font-size: 13px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid #000;
            padding: 6px;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        
      </head>
    
        ${htmlContent}
      
     
    </html>
  `);
    printWindow.document.close();
  };

  return (
    <div className="w-full flex flex-col p-5 rounded-l-2xl sticky bg-gray-200 top-1/5 shadow ">
      <div className="flex relative flex-col select-none items-center gap-5">
        <div className="absolute h-full bg-gray-300 top-0 left-1/2 w-0.5 -translate-x-1/2 transform z-0"></div>
        {[...Array(5)].map((i, idx) => (
          <div key={idx} className="relative z-10 h-8 w-8 bg-white border text-blue-700 border-blue-600 border-dotted rounded-full flex items-center justify-center cursor-pointer">
            {idx + 1}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-y-2.5 justify-center mt-20">
        <Button type="button" onClick={() => onSave && onSave()} className="w-full" variant="outline">
          Save <IoSaveSharp className="size-5" />
        </Button>
        <Button type="button" onClick={handlePrint} className="w-full" variant="outline">
          Print <MdPrint className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default Create_navigator;
