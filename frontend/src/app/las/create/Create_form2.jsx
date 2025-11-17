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

import axios from "axios";
import Table7_copy_for_form2 from "./Table7_copy_for_form2";
import TableLandEvaluation_and_calculator from "./TableLandEvaluation_and_calculator";

const Create_form2 = ({ LMSIN }) => {
  const [applicantData, setApplicantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localData, setLocalData] = useState({}); // added
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
    setLoading(true);
    try {
      const temp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getApplicant`, { LMSIN });

      if (temp.data) {
        setApplicantData(temp.data);
        setLocalData(temp.data.form1 ?? {}); // initialize
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  const handleTable7Change = useCallback((newRows) => {
    setLocalData((d) => ({ ...d, table7: newRows }));
  }, []);

  return (
    <>
      {applicantData?.form1 ? (
        <div className="pt-10 px-10 pb-0">
          <div className="flex flex-row justify-between items-center space-x-5">
            {/* Evaluator Name - ShadCN Combobox */}
            <div className="w-full">
              <Label>मूल्यांकन गर्नेको नामः</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full mt-2 justify-between">
                    {localData.evaluatorName || "छान्नुहोस्"}
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
                              setLocalData((d) => ({
                                ...d,
                                evaluatorName: o.name,
                                evaluatorPost: o.post,
                              }));
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
              <Input className="mt-2" value={localData.evaluatorPost || ""} disabled />
            </div>

            <div className="w-full">
              <Label htmlFor="date">स्थलमा गई मूल्यांकन गरेको मितिः</Label>
              <NepaliDateInput className="mt-2" />
            </div>
          </div>

          <span className="flex items-center my-4">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-gray-300"></span>
            <span className="shrink-0 px-4 text-gray-900">Page 1, Section 2</span>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-gray-300"></span>
          </span>

          <Table7_copy_for_form2 localData={localData} initialData={applicantData.form1?.table7} onDataChange={handleTable7Change} />
          <TableLandEvaluation_and_calculator localData={localData} initialData={applicantData.form1?.table7} />
        </div>
      ) : null}
    </>
  );
};

export default Create_form2;
