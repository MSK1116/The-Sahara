"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";
import Link from "next/link";
const History_recent = ({ sessionAuth0 }) => {
  const user = jwt.decode(sessionAuth0?.tokenSet?.idToken);
  const [fetchedHistory, setFetchedHistory] = useState();
  const [loading, setLoading] = useState(true);

  const handleFetchRecent = async () => {
    try {
      const promise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/las/getRecentHistory`, { databaseSlug: user?.databaseSlug });
      toast.promise(promise, {
        loading: "Loading history...",
        success: "History loaded!",
        error: (err) => err?.response?.data?.message || "Failed to update applicant. Please try again.",
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
    handleFetchRecent();
  }, []);

  useEffect(() => {
    console.log(fetchedHistory);
  }, [fetchedHistory]);

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
        <div className="px-5 cursor-default py-2 flex items-center space-x-3 text-sm text-gray-100 rounded-2xl bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 shadow-lg hover:shadow-xl transition-shadow duration-300 w-fit">
          <div className="relative">
            <div className="absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75 animate-ping"></div>
            <div className="relative h-3 w-3 rounded-full bg-white"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs opacity-80">Connected to</span>
            <span className="font-semibold">{user?.databaseSlug} Branch</span>
          </div>
        </div>
        <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fetchedHistory.map((historyItem, idx) => (
            <Link href={`/las/browse/${historyItem.LMSIN}`} key={idx} className="p-4  bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="size-1.5 rounded-full bg-blue-500"></div> <span className="text-xs text-gray-500">Recent Update</span>
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
          ))}
        </div>
      </main>
    </>
  );
};

export default History_recent;
