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

const Create_form2 = ({ LMSIN, onDataChange }) => {
  const [localData, setLocalData] = useState({});
  const [form2, setFrom2] = useState({});
  const officers = [
    {
      id: 1,
      post: "सहायक प्रथम",
      name: "वुद्ध राम महतो",
    },
    {
      id: 2,
      post: "सहायक द्वितीय",
      name: "वसन्त कुमार गुप्ता",
    },
    {
      id: 3,
      post: "सहायक द्वितीय",
      name: "दिपेन्द्र महतो",
    },
    {
      id: 4,
      post: "सहायक द्वितीय",
      name: "हफिज अंसारि",
    },
  ];

  const handleDataFetch = async () => {
    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN });

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

  return (
    <>
      {localData?.form1 ? (
        <div className="pt-10 px-10 pb-0">
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
                            key={o.id}
                            value={o.name}
                            onSelect={() => {
                              setFrom2((d) => ({
                                ...d,
                                evaluatorName: o.name,
                                evaluatorPost: o.post,
                              }));
                              document.body.click(); // Close popover
                            }}>
                            <Check className={cn("mr-2 h-4 w-4", o.name === localData.evaluatorName ? "opacity-100" : "opacity-0")} />
                            {o.name}
                          </CommandItem>
                        ))}
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
              <NepaliDateInput value={form2.evaluationDate} onChange={(val) => setFrom2((d) => ({ ...d, evaluationDate: val }))} className="mt-2" />
            </div>
          </div>

          <span className="flex items-center my-4">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></span>
            <span className="shrink-0 px-4 text-gray-900">Page 1, Section 2</span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
          </span>

          <Table7_copy_for_form2 localData={localData} initialData={localData.form1?.table7} onDataChange={handleTable1Change} />
          <TableLandEvaluation_and_calculator onDataChange={handleTable2Change} initialData={localData.form1?.table7} />

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
                    const cleaned = Number(String(convert(e.target.value, "toEn")).replace(/,/g, ""));
                    setFrom2((d) => ({ ...d, fiftyPercentMargin: cleaned }));
                    setFrom2((d) => ({ ...d, fiftyPercentMargin_text: convert(cleaned, "toNpWord", "currency") }));
                  }}
                  value={form2.fiftyPercentMargin || ""}
                />
              </div>
              <div className="w-full">
                <Label>अक्षरेपी रु.</Label>
                <Input className="mt-2" value={form2.fiftyPercentMargin ? convert(form2.fiftyPercentMargin, "toNpWord", "currency") + " मात्र /-" : ""} disabled />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Create_form2;
