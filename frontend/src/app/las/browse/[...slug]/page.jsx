// \frontend\src\app\chat\[...slug]\page.jsx
import { notFound, redirect } from "next/navigation";
import Browser_wrapper from "./Browser_wrapper";
import { auth0 } from "@/lib/auth0";

export async function generateMetadata({ params }) {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: `LMS Viewer`,
    icons: {
      icon: "/image_dir/LogoOnly.png",
      shortcut: "/image_dir/LogoOnly.png",
      apple: "/image_dir/LogoOnly.png",
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const sessionAuth0 = await auth0.getSession();
  if (!slug) {
    redirect(`/`);
  }

  return (
    <>
      <Browser_wrapper sessionAuth0={sessionAuth0} LMSIN={slug[0]} />
    </>
  );
}
