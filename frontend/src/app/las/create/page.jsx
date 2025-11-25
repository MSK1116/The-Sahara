import React from "react";
import CreateWrapper from "./CreateWrapper";
import { auth0 } from "@/lib/auth0";

const page = async () => {
  const session = await auth0.getSession();
  return (
    <>
      <CreateWrapper sessionAuth0={session} />
    </>
  );
};

export default page;
