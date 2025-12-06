import React from "react";

const MissingErrorModal = ({ errors }) => {
  return (
    <>
      <dialog id="errorModal" className="modal">
        <div className="modal-box py-10">
          <h3 className="font-bold text-red-600">Missing!</h3>
          <h4 className="text-xs text-gray-600 font-semibold">नयाँ छुटेका बक्सहरू हेर्नको लागि, कृपया कागजात फेरि प्रिन्ट गर्नुहोस्।</h4>
          <ol className="mt-4 list-decimal list-inside space-y-1.5 text-gray-700">
            {errors.map((field, idx) => (
              <li key={idx} className="wrap-break-words text-sm pb-1 border-b">
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
