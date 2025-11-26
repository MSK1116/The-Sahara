import { auth0 } from "@/lib/auth0";
import React from "react";
import History_recent from "./History_recent";

const page = async () => {
  const sessionAuth0 = await auth0.getSession();
  return (
    <>
      <History_recent sessionAuth0={sessionAuth0}></History_recent>
    </>
  );
};

export default page;
