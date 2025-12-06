"use client";
import NepaliDateInput from "@/components/NepaliDatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import convert from "number-to-nepali-words";
import axios from "axios";
import Table7_copy_for_form2 from "./Table7_copy_for_form2";
import TableLandEvaluation_and_calculator from "./TableLandEvaluation_and_calculator";
import jwt from "jsonwebtoken";
const Create_form2 = ({ LMSIN, onDataChange, sessionAuth0 }) => {
  const [localData, setLocalData] = useState({});
  const [form2, setFrom2] = useState({});
  const [fiftyPercentMarginLimit, setFiftyPercentMarginLimit] = useState(0);
  const [officers, setOfficers] = useState([]);

  const user = jwt.decode(sessionAuth0?.tokenSet?.idToken);

  const loadOfficers = async () => {
    try {
      const temp1 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/las/getOfficers`,
        { databaseSlug: user?.databaseSlug },
        {
          headers: {
            Authorization: `Bearer ${sessionAuth0?.tokenSet?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOfficers(temp1.data?.employee);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataFetch = async () => {
    try {
      const temp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`,
        { LMSIN, databaseSlug: user?.databaseSlug },
        {
          headers: {
            Authorization: `Bearer ${sessionAuth0?.tokenSet?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (temp.data) {
        setLocalData(temp.data ?? {});
        setFrom2(temp.data.form2 ?? {});
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    handleDataFetch();
    loadOfficers();
  }, [LMSIN]);

  const mergeTable7 = useCallback((newRows) => {
    setLocalData((prev) => ({
      ...prev,
      form1: {
        ...prev.form1,
        table7: newRows,
      },
    }));
  }, []);

  const handleTable1Change = mergeTable7;
  const handleTable2Change = mergeTable7;

  useEffect(() => {
    if (onDataChange) {
      onDataChange({ form1: localData.form1, form2 });
    }
  }, [localData, form2]);

  const handleFiftyPercent = (grandTotal) => {
    setFiftyPercentMarginLimit(grandTotal / 4);
  };

  const handleEnterFocus = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  }, []);

  return (
    <>
      {localData?.form1 ? (
        <form>
          <div className="pt-10 px-10 pb-0">
            <h1 className="text-xl select-none tracking-wide font-semibold mb-10 px-3 py-1 bg-gray-100 rounded-md w-fit">मूल्यांकन परतिवेदन </h1>
            <div className="flex flex-row justify-between items-center space-x-5">
              {/* Evaluator Name - ShadCN Combobox */}
              <div className="w-full">
                <Label>मूल्यांकन गर्नेको नामः</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full mt-2 justify-between">
                      {form2.evaluatorName || "छान्नुहोस्"}
                      <ChevronsUpDown className="opacity-50 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="नाम खोज्नुहोस्..." />
                      <CommandList>
                        <CommandEmpty>कुनै नाम भेटिएन।</CommandEmpty>
                        <CommandGroup>
                          {officers.map((o) => (
                            <CommandItem
                              key={o.nameEn}
                              value={o.nameNp}
                              onSelect={() => {
                                setFrom2((d) => ({
                                  ...d,
                                  evaluatorName: o.nameNp,
                                  evaluatorPost: o.post,
                                }));
                                document.body.click(); // Close popover
                              }}>
                              <Check className={cn("mr-2 h-4 w-4", o.nameNp == localData.evaluatorName ? "opacity-100" : "opacity-0")} />
                              {o.nameNp}
                            </CommandItem>
                          ))}
                          <CommandItem
                            key={"पुरानो मुलांकनको आधारमा"}
                            value={"पुरानो मुलांकनको आधारमा"}
                            onSelect={() => {
                              setFrom2((d) => ({
                                ...d,
                                evaluatorName: "पुरानो मुलांकनको आधारमा ",
                                evaluatorPost: "-",
                              }));
                              document.body.click(); // Close popover
                            }}>
                            <Check className={cn("mr-2 h-4 w-4", "पुरानो मुलांकनको आधारमा" == localData.evaluatorName ? "opacity-100" : "opacity-0")} />
                            पुरानो मुलांकनको आधारमा
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full">
                <Label>पद :</Label>
                <Input className="mt-2" value={form2.evaluatorPost || ""} disabled />
              </div>

              <div className="w-full">
                <Label htmlFor="date">स्थलमा गई मूल्यांकन गरेको मितिः</Label>
                <NepaliDateInput handleEnterFocus={handleEnterFocus} value={form2.evaluationDate || ""} onChange={(val) => setFrom2((d) => ({ ...d, evaluationDate: val }))} className="mt-2" />
              </div>
            </div>

            <span className="flex items-center my-4">
              <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></span>
              <span className="shrink-0 px-4 text-gray-900">Page 1, Section 2</span>
              <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
            </span>

            <Table7_copy_for_form2 localData={localData} initialData={localData.form1?.table7} onDataChange={handleTable1Change} />
            <TableLandEvaluation_and_calculator handleFiftyPercent={handleFiftyPercent} onDataChange={handleTable2Change} initialData={localData.form1?.table7} handleEnterFocus={handleEnterFocus} />

            <span className="flex items-center my-4">
              <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></span>
              <span className="shrink-0 px-4 text-gray-900">Page 1, Section 3</span>
              <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
            </span>

            <div className=" mb-10">
              <p className=" font-bold my-5">सिफारिस मूल्यः-</p>
              <div className=" flex flex-row items-center space-x-5">
                <div className="w-1/2">
                  <Label>५०% मार्जिन कटाई:</Label>
                  <Input
                    className="mt-2"
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setFrom2((d) => ({
                          ...d,
                          fiftyPercentMargin: "",
                          fiftyPercentMargin_text: "",
                        }));
                        return;
                      }
                      const cleaned = Number(String(convert(raw, "toEn")).replace(/,/g, ""));
                      if (isNaN(cleaned)) return;
                      if (cleaned > fiftyPercentMarginLimit && cleaned > localData.form1.amount) return;
                      setFrom2((d) => ({
                        ...d,
                        fiftyPercentMargin: cleaned,
                        fiftyPercentMargin_text: convert(cleaned, "toNpWord", "currency"),
                      }));
                    }}
                    value={form2.fiftyPercentMargin || ""}
                  />
                </div>
                <div className="w-full">
                  <Label>अक्षरेपी रु.</Label>
                  <Input className="mt-2" value={form2?.fiftyPercentMargin_text || ""} />
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default Create_form2;
