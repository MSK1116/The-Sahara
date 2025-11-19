"use client";
import Image from "next/image";
import React from "react";
import BikramSambat from "bikram-sambat-js";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const date = new Date();
  const nepDate = new BikramSambat(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).toBS().split("-");
  const bsMonths = ["Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const router = useRouter();
  return (
    <>
      <nav className=" sticky top-0 z-50 bg-gray-50 shadow-md px-10 py-4 rounded-b-xl">
        <div className=" flex flex-row justify-between items-center">
          <Link href={"/"} alt="home page" className=" relative w-60 h-15">
            <Image alt="logo" className=" object-center object-contain" fill={true} src={"/image_dir/thesahara-logo-img.png"}></Image>
          </Link>
          <div className=" flex flex-row gap-x-11 items-center justify-center">
            <Link href={"/"}>
              <TiHome className=" size-7.5 fill-blue-600 " />
            </Link>
            <Button onClick={() => router.push("/auth/logout")} className=" gap-x-3 items-center justify-center text-white flex flex-row from-blue-600 to-blue-700 bg-linear-to-br mx-auto rounded-md px-2 py-2">
              <div> Logout </div>
              <svg className="w-6 h-6 rotate-180 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4h5a2 2 0 002-2v-4a2 2 0 00-2-2h-5"></path>
              </svg>
            </Button>
            <div className=" rounded-xl cursor-default text-sm font-medium bg-gray-100 p-1 px-3">
              <span> {days[date.getDay()]} </span>
              <div className=" flex  flex-row space-x-1">
                <div>{bsMonths[`${+nepDate[1] - 1}`]} </div>
                <div>{nepDate[2]},</div>
                <div>{nepDate[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
