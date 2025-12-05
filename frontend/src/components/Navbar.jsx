"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import NepaliDate from "nepali-date-converter";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav
      className="
        sticky top-0 z-50 
        bg-white/70 backdrop-blur-lg 
        border-b border-gray-200/60 
        px-10 py-4
      ">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="relative w-52 h-12 transition active:scale-[0.97]">
          <Image alt="logo" src="/image_dir/thesahara-logo-img.png" fill className="object-contain object-left" />
        </Link>

        {/* Right Area */}
        <div className="flex items-center gap-8">
          {/* Home Icon */}
          <Link
            href="/"
            className="
              p-2 rounded-xl
              text-gray-600 hover:text-blue-600
              hover:bg-gray-100 active:scale-95 
              transition
            ">
            <TiHome className="size-6" />
          </Link>

          {/* Logout */}
          <Button
            onClick={() => router.push("/auth/logout")}
            className="
              gap-2 px-4 py-2
              bg-blue-600 hover:bg-blue-700
              text-white rounded-xl
              shadow-sm hover:shadow-md
              transition active:scale-95
            ">
            Logout
            <svg className="w-5 h-5 rotate-180 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4h5a2 2 0 002-2v-4a2 2 0 00-2-2h-5" />
            </svg>
          </Button>

          {/* Date Box */}
          <div
            className="
              px-5 py-2
              rounded-2xl border border-gray-200 
              bg-linear-to-br from-gray-50 to-white
              shadow-sm
              text-sm cursor-default
            ">
            <div className="font-medium text-gray-800">{new NepaliDate(new Date()).format("ddd", "np")}</div>

            <div className="flex gap-1 text-gray-600 mt-0.5">
              <span>{new NepaliDate(new Date()).format("DD", "np")}</span>
              <span>{new NepaliDate(new Date()).format("MMMM", "np")},</span>
              <span>{new NepaliDate(new Date()).format("YYYY", "np")}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
