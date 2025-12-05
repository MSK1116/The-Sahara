import React from "react";
import { FaPlus } from "react-icons/fa";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const Employee_create = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <span className=" cursor-pointer inline-flex ml-2 items-center mt-4 px-3 py-1 text-xs font-semibold rounded-full text-white shadow-md bg-blue-600">
            Add Employee <FaPlus className="ml-1" />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Employee</SheetTitle>
            <SheetDescription className={"text-sm"}>Please fill-up all the field, none of filed can be left empty.</SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Employee_create;
