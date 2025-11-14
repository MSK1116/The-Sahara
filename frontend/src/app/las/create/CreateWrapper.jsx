import React from "react";
import Create_form from "./Create_form";
import Create_navigator from "./Create_navigator";

const CreateWrapper = () => {
  return (
    <>
      <main className="flex flex-row flex-1 overflow-hidden">
        <div className="w-[88%] overflow-y-auto">
          <Create_form />
        </div>
        <div className="flex flex-1 h-full  overflow-y-auto">
          <Create_navigator />
        </div>
      </main>
    </>
  );
};

export default CreateWrapper;
