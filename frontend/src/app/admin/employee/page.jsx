import React from "react";
import Employee_page from "./Employee_page";
import { auth0 } from "@/lib/auth0";

const page = async () => {
  const sessionAuth0 = await auth0.getSession();
  const plainSession = sessionAuth0 ? JSON.parse(JSON.stringify(sessionAuth0)) : null;

  return (
    <>
      <Employee_page sessionAuth0={plainSession} />
    </>
  );
};

export default page;
