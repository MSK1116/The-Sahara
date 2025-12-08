"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";
import Link from "next/link";
import NepaliDateInput from "@/components/NepaliDatePicker";
import NepaliDate from "nepali-date-converter";
import { LuCalendarRange } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/calculateTimeAgo";

const Backup_page = ({ sessionAuth0 }) => {
  const user = jwt.decode(sessionAuth0?.tokenSet?.idToken);
  const [fetchedHistory, setFetchedHistory] = useState();
  const [loading, setLoading] = useState(true);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [startDate, setStartDate] = useState(new NepaliDate(sevenDaysAgo).format("YYYY-MM-DD"));
  const [finishDate, setFinishDate] = useState(new NepaliDate(new Date()).format("YYYY-MM-DD"));
  const [databaseSlug, setDatabaseSlug] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);

  const toADDate = (npDateStr) => {
    const ad = new NepaliDate(npDateStr).getAD();
    return new Date(Date.UTC(ad.year, ad.month, ad.date));
  };

  const handleSlugFetch = async () => {
    try {
      const promise = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/las/getAllBranchSlugs`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionAuth0?.tokenSet?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.promise(promise, {
        loading: "Loading branches...",
        success: "Branches loaded!",
        error: (err) => err?.response?.data?.message || "Failed to branches. Please try again.",
      });
      const try1 = await promise;
      if (try1.data) {
        setDatabaseSlug(try1.data.slugs);
        handleFetchRecent(try1.data.slugs[0]);
        return setSelectedSlug(try1.data.slugs[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchRecent = async (value) => {
    const startAD = toADDate(startDate);
    const finishAD = toADDate(finishDate);
    if (startAD > finishAD) return toast.error("Start date cannot be after finish date");
    const diffDays = (finishAD - startAD) / 86400000; // 1000*60*60*24
    if (diffDays < 2 || diffDays > 90) return toast.error("Date range must be between 2 and 90 days");

    try {
      const promise = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/las/getRecentHistory`,
        { databaseSlug: value, startDate: toADDate(startDate), finishDate: toADDate(finishDate) },
        {
          headers: {
            Authorization: `Bearer ${sessionAuth0?.tokenSet?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.promise(promise, {
        loading: "Loading history...",
        success: "History loaded!",
        error: (err) => err?.response?.data?.message || "Failed to Load history. Please try again.",
      });
      const try1 = await promise;
      setLoading(false);
      try1.data && setFetchedHistory(try1.data.result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSlugFetch();
  }, []);

  const handleEnterFocus = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-full flex flex-col items-center justify-center py-10 space-y-10">
          <div className=" loader"></div>
          <div>Loading recent changes...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="p-10">
        <div className=" flex flex-row items-center justify-between">
          <div className="px-5 cursor-default py-2 flex items-center space-x-3 text-sm text-gray-100 rounded-2xl bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-shadow duration-300 w-fit">
            <div className="relative">
              <div className="absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75 animate-ping"></div>
              <div className="relative h-3 w-3 rounded-full bg-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs ml-3 opacity-80">Connected to</span>
              <div className="w-full">
                <Popover className="">
                  <PopoverTrigger asChild>
                    <Button variant="ghost" role="combobox" className="w-40 min-w-fit bg-transparent p-0 justify-between">
                      {selectedSlug + " Branch" || "छान्नुहोस्"}
                      <ChevronsUpDown className="opacity-50 h-3 w-3" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="नाम खोज्नुहोस्..." />
                      <CommandList>
                        <CommandEmpty>कुनै नाम भेटिएन।</CommandEmpty>
                        <CommandGroup>
                          {databaseSlug.map((o, idx) => (
                            <CommandItem
                              key={idx + "databaseSlug"}
                              value={o}
                              onSelect={() => {
                                handleFetchRecent(o);
                                setSelectedSlug(o);
                                document.body.click();
                              }}>
                              <Check className={cn("mr-2 h-4 w-4", o == selectedSlug ? "opacity-100" : "opacity-0")} />
                              {o}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <form className=" flex flex-row space-x-3 w-1/2 px-3 items-center justify-between">
            <span>
              <LuCalendarRange className="size-5" />
            </span>
            <NepaliDateInput onChange={(val) => setStartDate(val)} value={startDate} handleEnterFocus={handleEnterFocus}></NepaliDateInput>
            <span>to</span>
            <NepaliDateInput onChange={(val) => setFinishDate(val)} value={finishDate} handleEnterFocus={handleEnterFocus}></NepaliDateInput>
            <Button onClick={() => handleFetchRecent(selectedSlug)} type={"button"} variant={"outline"} className="p-1 border rounded-full">
              <IoSearchSharp className="size-5 fill-blue-600" />
            </Button>
          </form>
        </div>
        <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fetchedHistory?.map((historyItem, idx) => {
            const updatedAgo = new NepaliDate(new Date(historyItem.updatedAgo)).getBS();
            const createdAgo = new NepaliDate(new Date(historyItem.createdAgo)).getBS();
            return (
              <Link href={`/las/browse/${historyItem.LMSIN}`} key={idx} className="p-4  bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between space-x-2 mb-2">
                  <div className=" flex flex-row items-center gap-1">
                    <div className="size-1.5 rounded-full bg-blue-500"></div>{" "}
                    <span title={timeAgo(historyItem.updatedAgo)} className="text-xs text-gray-500">
                      Updated: {updatedAgo.year}-{updatedAgo.month}-{updatedAgo.date}
                    </span>
                  </div>
                  <span title={timeAgo(historyItem.createdAgo)} className="text-xs text-gray-500">
                    Created: {createdAgo.year}-{createdAgo.month}-{createdAgo.date}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">LMSIN: </span> <span>{historyItem.LMSIN}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Citizenship #: </span> <span>{historyItem.citizenship_number}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Applicant: </span> <span>{historyItem.applicant_name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {!fetchedHistory?.length && <div className="w-full flex flex-col items-center justify-center py-16 text-gray-500 text-sm">दिइएको मिति दायरामा कुनै रेकर्ड फेला परेन।</div>}
      </main>
    </>
  );
};

export default Backup_page;
