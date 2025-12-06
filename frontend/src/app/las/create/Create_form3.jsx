"use client";
import NepaliDateInput from "@/components/NepaliDatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Create_form3 = ({ LMSIN, onDataChange, sessionAuth0 }) => {
  const [localData, setLocalData] = useState({});
  const [form3, setFrom3] = useState({});
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
        setFrom3(temp.data.form3 ?? {});
        console.log(temp.data.form3 ?? {});
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleDataFetch();
    loadOfficers();
  }, [LMSIN]);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({ form3 });
    }
  }, [form3]);

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
      {localData.form3 ? (
        <form>
          <div className="pt-10 px-10 pb-0">
            <h1 className="text-xl select-none tracking-wide font-semibold mb-10 px-3 py-1 bg-gray-100 rounded-md w-fit">मालपोतको लागि रोका पत्र</h1>

            <div className=" flex flex-row items-center justify-between">
              <div className=" flex flex-row items-center justify-center space-x-5">
                <div>
                  <Label className={"mb-2"}>शाखा किसिम</Label>
                  <Select disabled readOnly value={localData?.form1?.branchType || ""} className="mt-2">
                    <SelectTrigger>
                      <SelectValue placeholder="कार्यालयको किसिम"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"प्रधान कार्यालय "}>प्रधान कार्यालय</SelectItem>
                      <SelectItem value={"मुख्य साखा कार्यालय"}>मुख्य साखा कार्यालय</SelectItem>
                      <SelectItem value={"सेवा केन्द्र"}>सेवा केन्द्र</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  {" "}
                  <Label>कार्यालय</Label>
                  <Input className="mt-2" disabled readOnly value={localData?.form1?.branch || " "}></Input>
                </div>

                <div className=" w-30">
                  <Label>पत्र नं. </Label>
                  <Input onKeyDown={handleEnterFocus} className="mt-2" value={form3.malpotLetterNo || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotLetterNo: e.target.value }))}></Input>
                </div>
                <div className=" w-35">
                  <Label>चलानी नं.</Label>
                  <Input onKeyDown={handleEnterFocus} className="mt-2" value={form3.malpotLetterChalaniNo || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotLetterChalaniNo: e.target.value }))}></Input>
                </div>
              </div>
              <div className=" w-50">
                <Label className={"mb-2"}>मिति:</Label>
                <NepaliDateInput handleEnterFocus={handleEnterFocus} value={form3.malpotLetterDate || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotLetterDate: e }))} />
              </div>
            </div>
            <div className=" mt-5">
              <div className=" w-1/3">
                <Label className={"mb-2"}>मालपोत कार्यलय को नाम:</Label>
                <Input onKeyDown={handleEnterFocus} value={form3.malpotOfficeName || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotOfficeName: e.target.value }))}></Input>
              </div>
            </div>
            <div className=" mt-5">
              <div className=" w-1/3">
                <Label className={"mb-2"}>पर्तिनिधी :</Label>
                {/* <Input onKeyDown={handleEnterFocus} value={form3.malpotOfficerName || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotOfficerName: e.target.value }))}></Input> */}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full mt-2 justify-between">
                      {form3.malpotOfficerName || "छान्नुहोस्"}
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
                                setFrom3((d) => ({
                                  ...d,
                                  malpotOfficerName: o.nameNp,
                                }));
                                document.body.click(); // Close popover
                              }}>
                              <Check className={cn("mr-2 h-4 w-4", o.nameNp == form3.malpotOfficerName ? "opacity-100" : "opacity-0")} />
                              {o.nameNp}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className=" mt-5">
              <div className=" w-1/3">
                <Label className={"mb-2"}>पर्तिनिधी को नागरिकता नं. :</Label>
                <Input onKeyDown={handleEnterFocus} value={form3.malpotOfficerCitizenship_Number || ""} onChange={(e) => setFrom3((d) => ({ ...d, malpotOfficerCitizenship_Number: e.target.value }))}></Input>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default Create_form3;
