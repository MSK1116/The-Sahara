# The Sahara - User Manual

## 🚨 CRITICAL SECURITY VULNERABILITY 🚨

**Before proceeding, it is essential to address a critical security vulnerability discovered in the backend API.**

The API endpoints for adding and removing employees (`/api/las/addOfficer` and `/api/las/removeOfficer`) are **not protected by authentication**. This means that **any unauthenticated attacker on the internet can add or remove users from any branch in your system**, posing a severe and immediate risk to data integrity and system security.

**It is strongly recommended that you immediately fix this vulnerability by adding the `checkJwt` authentication middleware to these routes in `backend/routes/las.routes.js`.**

---

## 1. Introduction

Welcome to **The Sahara**, a comprehensive Loan Application System (LAS) designed to manage the entire loan application lifecycle for financial institutions. This manual will guide you through the features and functionalities of the application.

The Sahara is built with a modern architecture, featuring a Next.js frontend for a seamless user experience and a robust Node.js/Express backend for processing and storing data.

## 2. Core Concepts

To understand how The Sahara works, it's important to be familiar with these core concepts:

*   **Branches:** The system is designed for organizations with multiple branches. Each branch has its own set of employees and loan applications.
*   **Employees (Officers):** Users of the system are considered employees or officers, and each is associated with a specific branch. An employee can only access the data for the branch they are assigned to.
*   **Multi-Branch Database:** Each branch's loan application data is stored in a separate, isolated collection in the database. This ensures data privacy and organization between branches.

## 3. User Authentication

*   **Logging In:** User authentication is handled securely through **Auth0**. When you access the application, you will be redirected to an Auth0 login page to enter your credentials.
*   **Session Management:** Once logged in, your session is managed using JSON Web Tokens (JWTs), ensuring that all your subsequent actions are authenticated and authorized.

## 4. Main Modules & Features

### 4.1. Loan Application Management

The core of The Sahara is the ability to create, manage, and track loan applications.

#### Creating a New Loan Application

The loan application process is a comprehensive, multi-step form that captures a wide range of information.

1.  **Navigate to Create LAS:** From the main dashboard or navigation, select the option to create a new Loan Application.
2.  **Fill out the Forms:** You will be guided through a series of forms and tables, including:
    *   **Form 1:** Applicant's personal and contact information.
    *   **Detailed Tables:** These sections collect granular data related to land ownership, `Malpot` records, and other financial details. The frontend components (`Table1.jsx`, `Table2.jsx`, etc.) correspond to these sections.
3.  **Navigation:** A navigator component (`Create_navigator.jsx`) will show your progress through the form and allow you to move between different sections.
4.  **Submission:** Once all required information is entered, you can submit the form. The data is then securely saved to the database under your branch's collection.

#### Browsing and Viewing Applications

*   You can browse and search for existing loan applications within your branch.
*   The system provides a view to see the history of recent applications (`History_recent.jsx`).

### 4.2. Document Generation (`PageMaker`)

A key feature of The Sahara is the ability to generate official, printable documents directly from the application data. This is handled by the **PageMaker** module.

Once a loan application is completed, you can generate documents such as:

*   **Loan Application Form:** A printable version of the entire application.
*   **Loan Agreement (`Tamasuk`):** The formal loan agreement document.
*   **Letter to `Malpot`:** Official correspondence for land-related verifications.
*   And other related legal and financial documents.

This feature streamlines the paperwork process, reduces manual entry errors, and ensures consistency.

### 4.3. Administration Panel

The admin panel provides tools for managing employees and branches.

#### Employee Management

*   **Add Employee:** Add a new employee (officer) to a branch. **(WARNING: This is currently insecure).**
*   **Remove Employee:** Remove an employee from a branch. **(WARNING: This is currently insecure).**
*   **Transfer Employee:** Transfer an existing employee from one branch to another.

### 4.4. User Profile Management

You can manage your own user profile within the application.

*   **Change Password:** Update your login password.
*   **Change Avatar:** Change your profile picture/avatar.

## 5. UI Component Guide

The Sahara application uses a variety of modern UI components to create an interactive and user-friendly experience. While a full interactive exploration was not completed, here is a guide to the common elements you will encounter:

*   **Navbar (`Navbar.jsx`):** The main navigation bar at the top of the page, providing access to all major sections of the application.
*   **Buttons (`button.jsx`):** Standard buttons for actions like "Save", "Submit", "Cancel", etc.
*   **Dropdown Menus (`dropdown-menu.jsx`):** Used for selecting options from a list, such as branch names, provinces, or other predefined values.
*   **Modals (`dialog.jsx`):** Pop-up windows that appear for important actions or to display critical information, such as confirmation prompts or error messages (`MissingErrorModal.jsx`).
*   **Spinners/Loading Indicators:** When the application is fetching data from the backend (e.g., loading an application or submitting a form), you will likely see a loading spinner. This indicates that you should wait for the current operation to complete.
*   **Date Pickers (`NepaliDatePicker.jsx`):** A specialized calendar component for selecting dates, likely supporting the Nepali calendar.
*   **Form Inputs (`input.jsx`, `AreaInput.jsx`):** Various text fields and input areas for entering data. The application includes validation to ensure that data is entered in the correct format.
*   **File Uploads (`file-upload.jsx`):** Components that allow you to upload files, such as a new profile avatar (`ProfileUpload.jsx`).

This concludes the user manual for The Sahara.
