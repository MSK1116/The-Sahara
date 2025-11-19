"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoSaveSharp } from "react-icons/io5";
import { MdPrint } from "react-icons/md";
import { PageMaker_LoanApplicationPage1 } from "@/components/PageMaker/PageMaker_LoanApplicationPage1";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageMaker_LoanApplicationFrom2 } from "@/components/PageMaker/PageMaker_LoanApplicationForm2";
import toast from "react-hot-toast";
import { PageMaker_LoanApplicationLetterToMalpot } from "@/components/PageMaker/PageMaker_LoanApplicationLetterToMalpot";

const Create_navigator = ({ currentPage, onSave, data, handleFormPage, isUpserting, LMSIN, isEditing = false }) => {
  const [openPrintModal, setOpenPrintModal] = useState(false);

  const handlePrint1 = async () => {
    const updated = await onSave();
    if (!updated) return toast.error("Failed to update before printing.");
    setOpenPrintModal(false);

    const htmlContent = PageMaker_LoanApplicationPage1(updated);
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
<link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4;
          margin: 15mm;

          /* Page Number at Bottom */
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 10px;
            font-family: Mukta, sans-serif;
          }
        }

        body {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          counter-reset: page;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #000;
          padding: 6px;
        }

        /* Fallback in case browser does not support @bottom-center */
        @media print {
          .print-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            font-family: Poppins, sans-serif;
          }

          .print-footer::after {
            content: "Page " counter(page) " of " counter(pages);
          }
        }
      </style>

      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
${htmlContent}
    

  </html>
`);

    printWindow.document.close();
  };

  const handlePrint2 = async () => {
    const updated = await onSave();
    if (!updated) return toast.error("Failed to update before printing.");
    setOpenPrintModal(false);

    const htmlContent = PageMaker_LoanApplicationFrom2(updated);
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
<link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4;
          margin: 15mm;

          /* Page Number at Bottom */
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 10px;
            font-family: Mukta, sans-serif;
          }
        }

        body {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          counter-reset: page;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #000;
          padding: 6px;
        }

        /* Fallback in case browser does not support @bottom-center */
        @media print {
          .print-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            font-family: Poppins, sans-serif;
          }

          .print-footer::after {
            content: "Page " counter(page) " of " counter(pages);
          }
        }
      </style>

      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
${htmlContent}
    

  </html>
`);

    printWindow.document.close();
  };
  const handlePrint3 = async () => {
    const updated = await onSave();
    if (!updated) return toast.error("Failed to update before printing.");
    setOpenPrintModal(false);

    const htmlContent = PageMaker_LoanApplicationLetterToMalpot(updated);
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
<link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        @page {
          size: A4;
          margin: 15mm;

          /* Page Number at Bottom */
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 10px;
            font-family: Mukta, sans-serif;
          }
        }

        body {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          counter-reset: page;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #000;
          padding: 6px;
        }

        /* Fallback in case browser does not support @bottom-center */
        @media print {
          .print-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            font-family: Poppins, sans-serif;
          }

          .print-footer::after {
            content: "Page " counter(page) " of " counter(pages);
          }
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
    <div className="w-full flex flex-col px-5 pt-3 pb-0 rounded-l-2xl sticky bg-gray-200 top-1/6 shadow ">
      <div className="flex relative flex-col select-none items-center gap-5">
        <div className="absolute h-full bg-gray-300 top-0 left-1/2 w-0.5 -translate-x-1/2 transform z-0"></div>

        {[...Array(5)].map((i, idx) => (
          <Button
            variant={"outline"}
            disabled={!isEditing && idx !== 0}
            onClick={() => handleFormPage(idx + 1)}
            key={idx}
            className={` ${currentPage == idx + 1 ? " bg-blue-600 text-white border-white" : "bg-white border-blue-600"} relative z-10 h-8 w-8  border border-dotted rounded-full flex items-center justify-center cursor-pointer `}>
            {idx + 1}
          </Button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-y-2.5 justify-center mt-15">
        <Button disabled={isUpserting} type="button" onClick={() => onSave && onSave()} className="w-full" variant="outline">
          {isEditing ? "Update" : "Create"} {isUpserting ? <span className=" loading loading-xs loading-spinner"></span> : <IoSaveSharp className="size-5" />}
        </Button>
        <Button type="button" disabled={isUpserting || !isEditing} onClick={() => setOpenPrintModal(true)} className="w-full" variant="outline">
          Print <MdPrint className="size-5" />
        </Button>

        <span className="flex w-full items-center">
          <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-50"></span>
          <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-50"></span>
        </span>
        <p className="w-full text-center text-xs my-5 px-2 py-1 bg-white rounded-md">
          LMSIN<br></br>
          {LMSIN}
        </p>
      </div>
      <Dialog open={openPrintModal} onOpenChange={setOpenPrintModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Print Option</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={handlePrint1} variant="outline">
              ऋण माग पत्र
            </Button>
            <Button onClick={handlePrint2} variant="outline">
              धितो दिने घर जग्गाको मुलाङ्कन परतिवेदन
            </Button>
            <Button onClick={handlePrint3} variant="outline">
              मालपोतलाई चिठी
            </Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenPrintModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Create_navigator;
