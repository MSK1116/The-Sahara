"use client";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

const PRIMARY_COLOR = "#155dfc";

const CreateEmployeePage = () => {
  const { user, error: userError, isLoading: isUserLoading } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "employee",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      setMessage({ type: "error", content: "Please fill in all required fields." });
      return;
    }
    setIsSubmitting(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await axios.post("/api/auth0/createUser", formData);

      setMessage({ type: "success", content: `User ${response.data.email} created successfully!` });
      setFormData({ email: "", password: "", name: "", role: "employee" }); // Reset form
    } catch (error) {
      console.error("Failed to create user:", error);
      const errorMessage = error.response?.data?.error || "An unexpected error occurred. Please try again.";
      setMessage({ type: "error", content: `Error: ${errorMessage}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10 space-y-10">
        <div className="loader"></div>
        <div>Loading...</div>
      </div>
    );
  }

  if (userError) {
    return <div>Error loading user: {userError.message}</div>;
  }

  if (!user) {
    return <div>Please log in to create an employee.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 p-6 bg-white shadow-xl rounded-xl border border-gray-200 border-t-4" style={{ borderColor: PRIMARY_COLOR }}>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create New Employee Account</h1>
          <p className="mt-2 text-md text-gray-600">This will create a new user in Auth0 with the specified role in their application metadata.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long.</p>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="employee">Employee</option>
                <option value="branch_manager">Branch Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {message.content && <div className={`p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message.content}</div>}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-6 py-2 text-white shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                style={{ backgroundColor: PRIMARY_COLOR }}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeePage;
