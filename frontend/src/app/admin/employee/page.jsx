import React from "react";
import Employee_page from "./Employee_page";
import { auth0 } from "@/lib/auth0";

const page = async () => {
  const sessionAuth0 = await auth0.getSession();
  return (
    <>
      <Employee_page sessionAuth0={sessionAuth0} />
    </>
  );
};

export default page;
