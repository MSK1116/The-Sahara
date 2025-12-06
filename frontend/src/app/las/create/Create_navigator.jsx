"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoSaveSharp } from "react-icons/io5";
import { MdPrint } from "react-icons/md";
import { PageMaker_LoanApplicationPage1 } from "@/components/PageMaker/PageMaker_LoanApplicationPage1";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageMaker_LoanApplicationFrom2 } from "@/components/PageMaker/PageMaker_LoanApplicationForm2";
import toast from "react-hot-toast";
import { PageMaker_LoanApplicationLetterToMalpot } from "@/components/PageMaker/PageMaker_LoanApplicationLetterToMalpot";
import { PageMaker_LoanApplicationBharpaie } from "@/components/PageMaker/PageMaker_LoanApplicationBharpaie";
import { PageMaker_LoanApplicationTamasuk } from "@/components/PageMaker/PageMaker_LoanApplicationTamasuk";
import { PageMaker_LoanApplicationFamily } from "@/components/PageMaker/PageMaker_LoanApplicationFamily";
import { PageMaker_LoanApplicationManjurinama } from "@/components/PageMaker/PageMaker_LoanApplicationManjurinama";
import { validatePage } from "@/lib/LasFormValidation";
import { MdError } from "react-icons/md";
import MissingErrorModal from "@/components/MissingErrorModal";
const Create_navigator = ({ currentPage, onSave, handleFormPage, isUpserting, LMSIN, isEditing = false }) => {
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [missingFieldErrors, setMissingFieldErrors] = useState([]);

  const printHTML = async (generatorFn, title = "Print", pageToPrint) => {
    const updated = await onSave();
    if (!updated) return toast.error("Failed to update before printing.");
    const missingFieldError = validatePage(pageToPrint, updated);
    if (missingFieldError) {
      setOpenPrintModal(false);
      setMissingFieldErrors(missingFieldError);
      return document.getElementById("errorModal").showModal();
    }
    setOpenPrintModal(false);
    const htmlContent = generatorFn(updated);
    const printWindow = window.open("", "_blank");
    if (!printWindow) return alert("Pop-up blocked");

    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

        <style>
          @page {
            size: A4;
            margin: 15mm;
            @bottom-center {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 10px;
              font-family: Mukta, sans-serif;
            }
          }
          .b {
            text-orientation: mixed;
            writing-mode: vertical-lr;
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
        </style>

        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
      </head>

      ${htmlContent}

    </html>
  `);

    printWindow.document.close();
  };

  const handlePrint1 = () => printHTML(PageMaker_LoanApplicationPage1, LMSIN, 1);
  const handlePrint2 = () => printHTML(PageMaker_LoanApplicationFrom2, "", 2);
  const handlePrint3 = () => printHTML(PageMaker_LoanApplicationLetterToMalpot, "", 3);
  const handlePrint4 = () => printHTML(PageMaker_LoanApplicationBharpaie, "", 4);
  const handlePrint5 = () => printHTML(PageMaker_LoanApplicationTamasuk, "", 5);
  const handlePrint6 = () => printHTML(PageMaker_LoanApplicationFamily, "", 6);
  const handlePrint7 = () => printHTML(PageMaker_LoanApplicationManjurinama, "", 7);

  const pages = ["ऋण मागपत्र दर्ता", "मूल्यांकन परतिवेदन ", "मालपोतको लागि रोका पत्र", "तमसुक"];
  return (
    <>
      <MissingErrorModal errors={missingFieldErrors} />
      <div className="w-full flex flex-col px-4 pt-3 pb-0 rounded-l-2xl sticky bg-linear-to-l to-gray-200 from-gray-100 top-1/6 shadow ">
        <div className="flex relative flex-col select-none items-center gap-3">
          {missingFieldErrors.length > 0 && (
            <div className="absolute flex animate-bounce items-center justify-center top-0 left-0 size-4">
              <div className="absolute inset-0 rounded-full border border-red-600 animate-ping"></div>
              <Button onClick={() => document.getElementById("errorModal").showModal()} type="button" variant="ghost" className="size-4  cursor-pointer rounded-full relative z-10">
                <MdError className="fill-red-600 size-5.5" />
              </Button>
            </div>
          )}
          <div className="absolute h-full bg-gray-300 top-0 left-1/2 w-0.5 -translate-x-1/2 transform z-0"></div>

          {[...Array(4)].map((i, idx) => (
            <Button
              variant={"outline"}
              title={pages[idx]}
              disabled={!isEditing && idx !== 0}
              onClick={() => handleFormPage(idx + 1)}
              key={idx}
              className={` ${currentPage == idx + 1 ? " bg-blue-600 text-white border-white" : "bg-white border-blue-600"} relative z-10 h-8 w-8  border border-dotted rounded-full flex items-center justify-center cursor-pointer `}>
              {idx + 1}
            </Button>
          ))}
          <Button
            onClick={() => handleFormPage(10)}
            disabled={!isEditing}
            variant={"outline"}
            title={"नवीकरण"}
            className={` ${currentPage === 10 ? " bg-blue-600 text-white border-white" : "bg-white border-blue-600"}  relative z-10 h-8 w-fit border border-dotted  rounded-full flex items-center justify-center cursor-pointer `}>
            Renew
          </Button>
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
            {LMSIN ? LMSIN : <span className="loading text-red-600 loading-xs loading-dots"></span>}
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
                दृष्टिबन्धक पत्र
              </Button>
              <Button onClick={handlePrint6} variant="outline">
                व्यक्तिगत जमानीको सहमती
              </Button>
              <Button onClick={handlePrint5} variant="outline">
                तमसुक
              </Button>
              <Button onClick={handlePrint4} variant="outline">
                भरपाई
              </Button>
              <Button onClick={handlePrint7} variant="outline">
                मन्जुरीनामा
              </Button>
              <Button onClick={() => window.alert("Coming soon...")} variant="outline">
                फुकुवा पत्र
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
    </>
  );
};

export default Create_navigator;
