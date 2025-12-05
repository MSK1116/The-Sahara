"use client";
import axios from "axios";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import Employee_create from "./Employee_create";
import Employee_delete from "./Employee_delete";

const PRIMARY_COLOR = "#155dfc";

const processInitialData = (data) => {
  return data.map((branch) => ({
    ...branch,
    employee: branch.employee.map((emp) => ({
      ...emp,
      globalId: `${emp._id}-${Math.floor(100000 + Math.random() * 900000)}`,
    })),
  }));
};

// Helper function to find a specific employee by their globalId
const findEmployeeData = (branches, globalEmployeeId) => {
  for (const branch of branches) {
    const employee = branch.employee.find((e) => e.globalId === globalEmployeeId);
    if (employee) {
      return { ...employee, branchCode: branch.branchCode, branchName: branch.nameEn };
    }
  }
  return null;
};

const transferEmployee = (prevBranches, sourceBranchCode, targetBranchCode, globalEmployeeId) => {
  if (sourceBranchCode === targetBranchCode) return prevBranches;

  let employeeToMove = null;

  // 1. Find the employee to move and remove them from the source branch
  const newBranches = prevBranches.map((branch) => {
    if (branch.branchCode === sourceBranchCode) {
      const sourceEmployeeIndex = branch.employee.findIndex((emp) => emp.globalId === globalEmployeeId);
      if (sourceEmployeeIndex !== -1) {
        // Extract employee data
        employeeToMove = branch.employee[sourceEmployeeIndex];
        // Return new array without the moved employee
        return {
          ...branch,
          employee: [...branch.employee.slice(0, sourceEmployeeIndex), ...branch.employee.slice(sourceEmployeeIndex + 1)],
        };
      }
    }
    return branch;
  });

  if (!employeeToMove) {
    console.error("Transfer failed: Employee not found in source branch or globalId mismatch.");
    return prevBranches;
  }

  // 2. Add the employee to the target branch
  return newBranches.map((branch) => {
    if (branch.branchCode === targetBranchCode) {
      // Add employee to the beginning of the target array for visibility
      return {
        ...branch,
        employee: [employeeToMove, ...branch.employee],
      };
    }
    return branch;
  });
};

/**
 * Custom Modal Component (Emulating Shadcn Dialog/Modal)
 */
const TransferModal = ({ isOpen, onClose, branches, currentBranchCode, globalEmployeeId, onConfirmTransfer }) => {
  if (!isOpen) return null;

  // Find employee using globalId
  const currentEmployeeData = findEmployeeData(branches, globalEmployeeId);
  const [targetBranch, setTargetBranch] = useState("");

  const availableBranches = branches.filter((b) => b.branchCode !== currentBranchCode);

  React.useEffect(() => {
    if (isOpen) {
      setTargetBranch("");
    }
  }, [isOpen]);

  const handleTransfer = () => {
    if (targetBranch && currentBranchCode && globalEmployeeId) {
      onConfirmTransfer(currentBranchCode, targetBranch, globalEmployeeId);
      onClose();
    }
  };

  if (!currentEmployeeData) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 bg-opacity-70 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100" style={{ borderTop: `4px solid ${PRIMARY_COLOR}` }}>
        <h3 className="text-xl font-semibold text-gray-900 border-b pb-3 mb-4 tracking-tight">Confirm Transfer</h3>

        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to transfer <span className="font-semibold text-gray-900">{currentEmployeeData.nameEn}</span> from branch{" "}
          <span className="font-semibold">
            {currentBranchCode} ({currentEmployeeData.branchName})
          </span>
          ?
        </p>

        <div className="mb-6">
          <label htmlFor="target-branch" className="block text-sm font-medium text-gray-700 mb-2">
            Select Target Branch:
          </label>
          {/* Shadcn Select/Input Styling Emulation */}
          <select
            id="target-branch"
            value={targetBranch}
            onChange={(e) => setTargetBranch(e.target.value)}
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm
                                   focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm
                                   disabled:cursor-not-allowed disabled:opacity-50">
            {availableBranches.map((branch) => (
              <option key={branch.branchCode} value={branch.branchCode}>
                {branch.branchCode} - {branch.nameEn} ({branch.address})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          {/* Shadcn Button - Secondary/Ghost Emulation */}
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
                                   h-10 px-4 py-2 bg-gray-100 text-gray-900 
                                   hover:bg-gray-200 
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 
                                   disabled:pointer-events-none disabled:opacity-50">
            Cancel
          </button>
          {/* Shadcn Button - Primary Emulation */}
          <button
            onClick={handleTransfer}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
                                   h-10 px-4 py-2 text-white shadow-md 
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
                                   disabled:pointer-events-none disabled:opacity-50"
            style={{ backgroundColor: PRIMARY_COLOR, boxShadow: `0 4px 6px -1px rgba(21, 93, 252, 0.5), 0 2px 4px -2px rgba(21, 93, 252, 0.5)` }}>
            Transfer Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Employee_page({ sessionAuth0 }) {
  const [branches, setBranches] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBranchFetch = async () => {
    try {
      const try1 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/las/getBranch`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionAuth0?.tokenSet?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      try1 && setLoading(false);
      return setBranches(processInitialData(try1.data?.fetchBranch));
    } catch (error) {
      setLoading(false);
      return console.log(error);
    }
  };

  useEffect(() => {
    handleBranchFetch();
  }, [sessionAuth0]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Store globalId in modalEmployee state
  const [modalEmployee, setModalEmployee] = useState({ branchCode: "", globalId: "" });

  // --- Core Transfer Logic ---
  const handleTransfer = useCallback((sourceBranchCode, targetBranchCode, globalEmployeeId) => {
    setBranches((prevBranches) => transferEmployee(prevBranches, sourceBranchCode, targetBranchCode, globalEmployeeId));
  }, []);

  // --- Drag and Drop Handlers ---
  const handleDragStart = useCallback((e, branchCode, globalEmployeeId) => {
    // Store information about the employee being dragged using the globalId
    const dragData = { sourceBranchCode: branchCode, globalEmployeeId: globalEmployeeId };
    setDraggedItem(dragData);
    e.dataTransfer.setData("application/json", JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Necessary to allow drop
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e, targetBranchCode) => {
      e.preventDefault();
      if (!draggedItem) return;

      const { sourceBranchCode, globalEmployeeId } = draggedItem;

      // Check if the source and target are the same branch
      if (sourceBranchCode === targetBranchCode) {
        setDraggedItem(null);
        return;
      }

      handleTransfer(sourceBranchCode, targetBranchCode, globalEmployeeId);
      setDraggedItem(null);
    },
    [draggedItem, handleTransfer]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  // --- Modal Handlers ---
  const openModal = useCallback((branchCode, globalEmployeeId) => {
    setModalEmployee({ branchCode, globalId: globalEmployeeId });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalEmployee({ branchCode: "", globalId: "" });
  }, []);

  // Total employees calculation for a summary badge
  const totalEmployees = useMemo(() => {
    return branches.reduce((count, branch) => count + (branch.employee?.length || 0), 0);
  }, [branches]);

  if (loading) {
    return (
      <>
        <div className="w-full flex flex-col items-center justify-center py-10 space-y-10">
          <div className=" loader"></div>
          <div>Loading branch data...</div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 p-6 bg-white shadow-xl rounded-xl border border-gray-200 border-t-4" style={{ borderColor: PRIMARY_COLOR }}>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 animate-pulse" style={{ color: PRIMARY_COLOR }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 16.668V11" />
              <path d="M10 13.5l2 2 2-2" />
            </svg>
            Employee Dashboard
          </h1>
          <p className="mt-2 text-md text-gray-600">Manage employee assignments by dragging and dropping them between branches, or use the quick transfer button.</p>
          {/* Badge Style */}
          <span className="inline-flex items-center mt-4 px-3 py-1 text-xs font-semibold rounded-full text-white shadow-md" style={{ backgroundColor: PRIMARY_COLOR }}>
            Total Employees: {totalEmployees}
          </span>
          <Employee_create branches={branches} />
        </div>

        {/* Branch Containers (Drag & Drop Zones - Emulating Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {branches.map((branch) => (
            <div
              key={branch.branchCode}
              // The main drop zone for the branch
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, branch.branchCode)}
              className={`
                bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300
                ${draggedItem?.sourceBranchCode === branch.branchCode ? "ring-2 ring-gray-300 shadow-inner" : ""}
                ${draggedItem && draggedItem.sourceBranchCode !== branch.branchCode ? "hover:border-dashed hover:border-4 hover:border-green-500 hover:shadow-2xl" : ""}
                p-5 flex flex-col h-full
              `}>
              {/* Branch Header */}
              <div className="pb-3 mb-3 border-b border-gray-100">
                <h2 className="text-xl font-semibold tracking-tight text-gray-800">
                  <span className="text-lg mr-2 font-mono font-bold" style={{ color: PRIMARY_COLOR }}>
                    {branch.branchCode}
                  </span>
                  {branch.nameEn}
                </h2>
                <p className="text-xs text-gray-500 mt-1">{branch.address}</p>
              </div>

              {/* Employee List Container */}
              <div className="grow space-y-3 min-h-[120px]">
                {branch.employee && branch.employee.length > 0 ? (
                  branch.employee.map((employee) => (
                    <div
                      key={employee.globalId} // Use the new globalId for unique keying
                      draggable
                      onDragStart={(e) => handleDragStart(e, branch.branchCode, employee.globalId)} // Pass globalId
                      onDragEnd={handleDragEnd}
                      className={`
                        p-3 bg-white rounded-lg shadow-sm cursor-grab flex justify-between items-center group
                        hover:bg-gray-50 hover:ring-2 hover:ring-opacity-50 hover:scale-[1.01] transition-all duration-200 ease-in-out
                        ${draggedItem?.globalEmployeeId === employee.globalId && draggedItem?.sourceBranchCode === branch.branchCode ? "opacity-40 ring-4 ring-yellow-400 scale-100 shadow-none" : "ring-gray-100"}
                        border border-gray-200
                      `}
                      style={{ borderLeft: `5px solid ${PRIMARY_COLOR}` }}>
                      <div>
                        <p className="font-medium text-gray-900">{employee.nameEn}</p>
                        <p className="text-xs text-gray-500">{employee.post}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Employee_delete databaseSlug={branch.databaseSlug} employee={employee} />
                        <button
                          onClick={() => openModal(branch.branchCode, employee.globalId)} // Pass globalId
                          className="p-2 h-8 w-8 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 hover:scale-100 shadow-md flex items-center justify-center 
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          style={{ backgroundColor: PRIMARY_COLOR }}
                          title="Quick Transfer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  // Placeholder when a branch has no employees
                  <div className="text-center p-8 border-4 border-dashed border-gray-100 rounded-lg text-gray-400 bg-gray-50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-3m-1.724-11.399l-11-2a1 1 0 00-1.374.378L3 8.35v11.65a1 1 0 001.757.659l2.7-2.7h8.846a1 1 0 001-1V4.707a1 1 0 00-.515-.878z" />
                    </svg>
                    <p className="text-sm font-medium">Empty Branch - Drop Employee Here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer for status and error checking */}
        <div className="mt-10 p-4 text-center bg-white rounded-xl shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Status: {draggedItem ? `Dragging Employee (Global ID: ${draggedItem.globalEmployeeId}) from Branch ${draggedItem.sourceBranchCode}. Drop into another branch card.` : "Ready for Drag & Drop or Quick Transfer."}
          </p>
        </div>

        {/* Transfer Modal */}
        <TransferModal
          isOpen={isModalOpen}
          onClose={closeModal}
          branches={branches}
          currentBranchCode={modalEmployee.branchCode}
          globalEmployeeId={modalEmployee.globalId} // Pass globalId
          onConfirmTransfer={handleTransfer}
        />
      </div>
    </div>
  );
}
