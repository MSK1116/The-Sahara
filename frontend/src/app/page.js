import Image from "next/image";
import Home_page from "@/Home/Home_page";
import { auth0 } from "@/lib/auth0";
export default async function Home() {
  const session = await auth0.getSession();
  return <Home_page sessionAuth0={session} />;
}
