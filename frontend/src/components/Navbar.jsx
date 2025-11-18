import Image from "next/image";
import React from "react";
import BikramSambat from "bikram-sambat-js";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
const Navbar = () => {
  const date = new Date();
  const nepDate = new BikramSambat(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).toBS().split("-");
  const bsMonths = ["Baishakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <>
      <nav className=" sticky top-0 z-50 bg-gray-50 shadow-md px-10 py-4 rounded-b-xl">
        <div className=" flex flex-row justify-between items-center">
          <Link href={"/"} alt="home page" className=" relative w-60 h-15">
            <Image alt="logo" className=" object-center object-contain" fill={true} src={"/image_dir/thesahara-logo-img.png"}></Image>
          </Link>
          <div className=" flex flex-row space-x-11 items-center justify-center">
            <Link href={"/"}>
              <TiHome className=" size-7.5 fill-blue-600 " />
            </Link>
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
