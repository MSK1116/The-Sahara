"use client";
import Image from "next/image";
import React, { use, useState } from "react";
import convert from "number-to-nepali-words";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import jwt from "jsonwebtoken";
import { FaGear } from "react-icons/fa6";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ChangePassword from "@/components/ChangePassword";
const Home_page = ({ sessionAuth0 }) => {
  const router = useRouter();
  const [lmsin, setLmsin] = useState("");

  const user = jwt.decode(sessionAuth0?.tokenSet?.idToken);

  const handleSearch = () => {
    if (lmsin.length !== 6) {
      toast.error("LMSIN must be 6 digits");
      return;
    } else {
      const formattedLmsin = `${lmsin.slice(0, 3)}-${lmsin.slice(3)}`;
      router.push(`/las/browse/${formattedLmsin}`);
    }
  };
  return (
    <>
      <ChangePassword user={user} />
      <div className=" w-full h-full  flex flex-row space-x-5 py-20 px-10">
        <div className=" w-[40%] relative flex flex-col items-center justify-center bg-linear-to-br from-blue-600 to-blue-700 p-10 pb-3 rounded-sm cursor-default">
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className=" select-none  p-2 active:scale-105 rounded-full bg-blue-600 shadow-2xl ">
                  <FaGear className="fill-white active:scale-95 hover:animate-spin size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => document.getElementById("changePassword").showModal()} className={"text-xs"}>
                  Change Password
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className=" text-xl font-bold text-center mb-5 text-white">Welcome to Loan Application System!</p>
          <div className=" relative mx-auto size-30 rounded-full">
            <Image alt="profile image" className=" border-2 border-white object-center object-cover rounded-full" src={user?.profileImage || "/image_dir/LogoOnly.png"} fill={true}></Image>
          </div>
          <div className=" text-center  mt-4 space-x-1 text-white">
            <p className=" uppercase font-bold tracking-wider">Hello, {sessionAuth0?.user?.nickname || "Guest"}!</p>
            <p className=" text-sm tracking-wide">{user?.officerPost}</p>
            <p className=" text-sm">{user?.officerBranch}</p>
          </div>
          {user.privilege?.includes("Admin") && (
            <a href="/admin" className=" shadow-xl flex items-center justify-between text-blue-600 text-xs mt-3 bg-gray-200 px-2 py-0.5 mx-auto font-semibold rounded-xl  ">
              Admin Dashboard <FaArrowRightFromBracket className="ml-1" />
            </a>
          )}
        </div>
        <div className="grid grid-cols-3 w-[60%]  gap-5  p-5 py-10">
          <a href="/las/create" className="flex items-center border-t-4 border-blue-500 justify-center flex-col rounded-sm hover:shadow-xl bg-gray-100 p-6">
            <IoAddCircleSharp className="fill-blue-700 size-10" />
            <p className="mt-3 text-center">Create New</p>
          </a>

          <a href="/las/history" className="flex items-center justify-center flex-col rounded-sm hover:shadow-xl bg-gray-100 p-6">
            <FaHistory className="fill-blue-700 size-10" />
            <p className="mt-3 text-center">Branch History</p>
          </a>

          <div className="flex items-center justify-center flex-col rounded-sm shadow-inner bg-gray-100 p-6">
            <IoSearchSharp className="fill-blue-700 size-10" />
            <p className="mt-3 text-center font-semibold">Quick Search</p>
            <p className="text-xs text-gray-500 mb-3 text-center">Enter the 6-digit LMSIN.</p>
            <Input
              placeholder="12XX45"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onChange={(e) => {
                const inEn = convert(e.target.value || "1", "toEn").trim();
                setLmsin(inEn);
              }}
            />
            <Button variant="outline" type="button" onClick={handleSearch} className="w-full mt-4">
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home_page;
