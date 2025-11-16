// \frontend\src\app\chat\[...slug]\page.jsx
import { notFound, redirect } from "next/navigation";
import Browser_wrapper from "./Browser_wrapper";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  console.log(slug);
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

  if (!slug) {
    redirect(`/`);
  }

  return (
    <>
      <Browser_wrapper LMSIN={slug[0]} />
    </>
  );
}
