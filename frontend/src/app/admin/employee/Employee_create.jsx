"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const Employee_create = ({ branches }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nameEn: "",
    nameNp: "",
    post: "",
    databaseSlug: "",
    branchType: "",
    branchNameNp: "",
    branchCode: "",
    profileImage: "https://i.postimg.cc/rwCLXBPg/un-Known-User.jpg",
  });

  const typeOfPost = ["सहायक तृतिय", "सहायक द्वितीय", "सहायक प्रथम", "कार्यालय प्रमुख", "सूचना प्राविधिक"];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [createdUser, setCreatedUser] = useState(null);

  const cleaned = branches.map((branch) => {
    const copy = { ...branch };
    delete copy.employee;
    return copy;
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || !formData.nameEn || !formData.nameNp || !formData.post || !formData.databaseSlug) {
      setMessage({ type: "error", content: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", content: "" });

    try {
      const promise = axios.post("/api/createUser", formData);
      toast.promise(promise, {
        loading: "Creating...",
        success: "Created!",
        error: "Failed to create user.",
      });
      const response = await promise;
      setMessage({ type: "success", content: `User ${response.data.email} created successfully!` });

      // store the created user to show after form
      setCreatedUser({
        email: response.data.email,
        password: formData.password,
      });

      // clear the form
      setFormData({
        email: "",
        password: "",
        nameEn: "",
        nameNp: "",
        post: "",
        databaseSlug: "",
        branchType: "",
        branchNameNp: "",
        branchCode: "",
        profileImage: "https://i.postimg.cc/rwCLXBPg/un-Known-User.jpg",
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      const errorMessage = error.response?.data?.error || "An unexpected error occurred. Please try again.";
      setMessage({ type: "error", content: `Error: ${errorMessage}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCreatedUser(null);
    setMessage({ type: "", content: "" });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="cursor-pointer ml-2 inline-flex items-center mt-4 px-3 py-1 text-xs font-semibold bg-blue-700 rounded-full text-white shadow-md">
          Add Employee <FaPlus className="ml-1 size-3" />
        </span>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Add Employee</SheetTitle>
          <SheetDescription className="text-sm">Please fill all fields. No field can be left empty.</SheetDescription>
        </SheetHeader>

        {/* If user created, show success view */}
        {createdUser ? (
          <div className="flex flex-col gap-4 items-center mt-6 px-3">
            <p className="text-center text-lg font-medium text-green-700">User created successfully!</p>

            <div className="flex flex-col gap-2 w-full max-w-sm">
              <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
                <span>{createdUser.email}</span>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(createdUser.email)}>
                  Copy
                </Button>
              </div>

              <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
                <span>{createdUser.password}</span>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(createdUser.password)}>
                  Copy
                </Button>
              </div>
            </div>

            <Button variant="default" className="mt-4" onClick={handleReset}>
              Back to Form
            </Button>
          </div>
        ) : (
          <>
            {/* --- FORM --- */}
            <form className="mt-6 px-3 flex flex-col gap-5">
              {/* Branch Name */}
              <div className="flex flex-col gap-1">
                <Label>Branch Name</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {formData?.databaseSlug || "छान्नुहोस्"}
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-full">
                    <Command>
                      <CommandInput placeholder="नाम खोज्नुहोस्..." />
                      <CommandList>
                        <CommandEmpty>कुनै नाम भेटिएन।</CommandEmpty>
                        <CommandGroup heading="Branches">
                          {cleaned?.map((o, idx) => (
                            <CommandItem
                              key={idx}
                              onSelect={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  branchCode: o.branchCode,
                                  branchType: o.branchType,
                                  branchNameNp: o.nameNp,
                                  databaseSlug: o.databaseSlug,
                                }));
                                document.body.click();
                              }}>
                              <Check className={cn("mr-2 h-4 w-4", o.databaseSlug === formData.databaseSlug ? "opacity-100" : "opacity-0")} />
                              {o.databaseSlug}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label>Employee Email</Label>
                <Input type="email" className="w-full" onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" />
              </div>

              {/* Name Nepali */}
              <div className="flex flex-col gap-1">
                <Label>Employee full name (Nepali)</Label>
                <Input className="w-full" onChange={(e) => setFormData((prev) => ({ ...prev, nameNp: e.target.value }))} placeholder="नाम (नेपाली)" />
              </div>

              {/* Name English */}
              <div className="flex flex-col gap-1">
                <Label>Employee full name (English)</Label>
                <Input className="w-full" onChange={(e) => setFormData((prev) => ({ ...prev, nameEn: e.target.value }))} placeholder="Full name (English)" />
              </div>

              {/* Post */}
              <div className="flex flex-col gap-1">
                <Label>Employee Post</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {formData.post || "छान्नुहोस्"}
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="पोष्ट खोज्नुहोस्..." />
                      <CommandList>
                        <CommandEmpty>कुनै पोष्ट भेटिएन।</CommandEmpty>
                        <CommandGroup heading="Posts">
                          {typeOfPost?.map((o, idx) => (
                            <CommandItem
                              key={idx}
                              onSelect={() => {
                                setFormData((prev) => ({ ...prev, post: o }));
                                document.body.click();
                              }}>
                              <Check className={cn("mr-2 h-4 w-4", o === formData.post ? "opacity-100" : "opacity-0")} />
                              {o}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <Label>Password</Label>
                <Input type="password" placeholder="Enter password" onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} />
              </div>
            </form>

            <Button onClick={handleSubmit} variant={"outline"} disabled={isSubmitting} type="button">
              Create user
            </Button>
          </>
        )}

        {message.content && (
          <div className={`px-3 py-2 rounded-md text-center w-fit mx-auto mb-4 text-sm font-medium ${message.type === "success" ? "bg-green-100 text-green-800" : ""} ${message.type === "error" ? "bg-red-100 text-red-800" : ""}`}>
            {message.content}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Employee_create;
