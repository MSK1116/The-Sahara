import Image from "next/image";
import React from "react";

import { IoAddCircleSharp } from "react-icons/io5";
import { FaFolderClosed } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
const Home_page = () => {
  return (
    <>
      <div className=" w-full h-full flex flex-row space-x-5 py-20 px-10">
        <div className=" w-[40%] bg-blue-700 p-10 rounded-sm cursor-default">
          <p className=" text-xl font-bold text-center mb-5 text-white">Welcome to Loan Application System!</p>
          <div className=" relative mx-auto size-30 rounded-full">
            <Image className=" border border-white object-center object-cover rounded-full" src={"/image_dir/personaA.jpg"} fill={true}></Image>
          </div>
          <div className=" text-center  mt-4 space-x-1 text-white">
            <p className=" font-bold">Buddha Ram Mahato</p>
            <p className=" text-sm">Branch Manager</p>
            <p className=" text-sm">Kaliya, Bara</p>
          </div>
        </div>
        <div className="flex flex-row items-center cursor-default space-x-5 w-[60%] h-auto p-5 py-10">
          <a href="/las/create" className=" flex items-center justify-center flex-col rounded-sm hover:shadow-xl w-full h-full bg-gray-100">
            <IoAddCircleSharp className=" fill-blue-700 size-15" />
            <p className=" mt-3 text-center">Create New</p>
          </a>
          <a href="/las/create" className=" flex items-center justify-center flex-col rounded-sm hover:shadow-xl w-full h-full bg-gray-100">
            <FaFolderClosed className=" fill-blue-700 size-15" />
            <p className=" mt-3 text-center">Browse Old</p>
          </a>
          <a href="/las/create" className=" flex items-center justify-center flex-col rounded-sm hover:shadow-xl w-full h-full bg-gray-100">
            <IoSearchSharp className=" fill-blue-700 size-15" />
            <p className=" mt-3 text-center">Quick Search</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home_page;
