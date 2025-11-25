"use client";
import Image from "next/image";
import React, { use, useState } from "react";
import convert from "number-to-nepali-words";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import jwt from "jsonwebtoken";

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
      <div className=" w-full h-full flex flex-row space-x-5 py-20 px-10">
        <div className=" w-[40%] bg-blue-700 p-10 rounded-sm cursor-default">
          <p className=" text-xl font-bold text-center mb-5 text-white">Welcome to Loan Application System!</p>
          <div className=" relative mx-auto size-30 rounded-full">
            <Image alt="profile image" className=" border border-white object-center object-cover rounded-full" src={user?.profileImage || "/image_dir/LogoOnly.png"} fill={true}></Image>
          </div>
          <div className=" text-center  mt-4 space-x-1 text-white">
            <p className=" capitalize font-bold tracking-wider">{sessionAuth0?.user?.nickname || "Guest"}</p>
            <p className=" text-sm tracking-wide">{user?.officerPost}</p>
            <p className=" text-sm">{user?.officerBranch}</p>
          </div>
        </div>
        <div className="flex flex-row items-center cursor-default space-x-5 w-[60%] h-auto p-5 py-10">
          <a href="/las/create" className=" flex items-center justify-center flex-col rounded-sm hover:shadow-xl w-full h-full bg-gray-100">
            <IoAddCircleSharp className=" fill-blue-700 size-15" />
            <p className=" mt-3 text-center">Create New</p>
          </a>

          <div className=" flex items-center justify-center flex-col rounded-sm shadow-inner p-4 w-full h-full bg-gray-100">
            <IoSearchSharp className="fill-blue-700 size-15" />
            <p className="mt-3 text-center font-semibold">Quick Search</p>
            <p className="text-xs text-gray-500 mb-3 text-center">Enter the 6-digit LMSIN.</p>
            <Input
              onChange={(e) => {
                const inEn = convert(e.target.value || "1", "toEn").trim();
                setLmsin(inEn);
              }}></Input>
            <Button variant={"outline"} type="button" onClick={handleSearch} className="w-full mt-4">
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home_page;
