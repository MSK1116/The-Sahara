import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdPrint } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
const Create_navigator = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-between shadow p-5 bg-gray-100">
        <div className="flex relative flex-col select-none items-center gap-5">
          {/* centered vertical line behind the buttons */}
          <div className="absolute h-full bg-gray-300 top-0 left-1/2 w-0.5 -translate-x-1/2 transform z-0"></div>
          {[...Array(5)].map((i, idx) => (
            <div key={idx} className="relative z-10 h-8 w-8 bg-white border text-blue-700 border-blue-600 border-dotted rounded-full flex items-center justify-center cursor-pointer">
              {idx + 1}
            </div>
          ))}
        </div>
        <div className=" flex flex-col items-center gap-y-2.5 justify-center">
          <Button className={" w-full"} variant={"outline"}>
            Save <IoSaveSharp className=" size-5" />
          </Button>
          <Button className={"bg-blue-600 w-full"} variant={""}>
            Print <IoMdPrint className=" fill-white size-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Create_navigator;
