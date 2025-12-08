"use client";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const Employee_delete = ({ databaseSlug, employee }) => {
  const handleDelete = async () => {
    try {
      const promise = axios.post("/api/deleteUser", { databaseSlug, employee });
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Deleted!",
        error: "Failed to delete user.",
      });
      const try1 = await promise;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={() => handleDelete()}
        className="p-2 h-8 w-8 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 hover:scale-100 shadow-md flex items-center justify-center 
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 hover:bg-red-600"
        style={{ backgroundColor: "#dc2626" }} // Using a clear red color (e.g., tailwind's red-600)
        title="Delete Employee">
        {/* Trash Icon (Lucide/Heroicons equivalent) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </>
  );
};

export default Employee_delete;
