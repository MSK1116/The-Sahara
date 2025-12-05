import { auth0 } from "@/lib/auth0";
import React from "react";
import Backup_page from "./Record_page";

const page = async () => {
  const sessionAuth0 = await auth0.getSession();
  return (
    <>
      <Backup_page sessionAuth0={sessionAuth0} />
    </>
  );
};

export default page;
