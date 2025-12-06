import React from "react";

const MissingErrorModal = ({ errors }) => {
  return (
    <>
      <dialog id="errorModal" className="modal">
        <div className="modal-box py-10">
          <h3 className="font-bold text-red-600">Missing!</h3>
          <h4 className="text-sm text-gray-600 font-semibold">नयाँ छुटेका क्षेत्रहरू हेर्न कृपया अपडेट गर्नुहोस्।</h4>
          <ol className="mt-4 list-decimal list-inside space-y-1 text-gray-700">
            {errors.map((field, idx) => (
              <li key={idx} className="wrap-break-words">
                {field}
              </li>
            ))}
          </ol>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default MissingErrorModal;
