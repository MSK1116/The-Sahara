"use client";
import React, { useState, useEffect } from "react";
import { Users, FileText, LayoutDashboard, Database, LogOut } from "lucide-react";
const NavCard = ({ title, description, href, icon: Icon }) => (
  <a
    href={href}
    className="w-full md:w-80 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 
                   border-t-4 border-blue-500 flex flex-col items-start space-y-3">
    <div className="flex items-center space-x-4">
      <Icon className="w-8 h-8 text-blue-600" />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <p className="text-gray-500 text-sm">{description}</p>
    <div className="text-blue-500 font-medium text-sm mt-2 flex items-center">
      Go to {title}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </a>
);

const Admin_page = () => {
  const navItems = [
    {
      title: "Employee Management",
      description: "View, add, edit, and transfer employee records",
      href: "/admin/employee",
      icon: Users,
    },
    {
      title: "Data Records & Reports",
      description: "Access system logs, generate reports, and review historical data entries.",
      href: "/admin/record",
      icon: FileText,
    },
  ];
  return (
    <>
      <main className="container mx-auto py-12 px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Welcome Back!</h2>
        <p className="text-gray-500 mb-10">Quickly navigate to key administrative sections below.</p>

        {/* Dashboard Grid - Now only shows two cards, centered appropriately by Tailwind */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {navItems.map((item) => (
            <NavCard key={item.href} {...item} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Admin_page;
