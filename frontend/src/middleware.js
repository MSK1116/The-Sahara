// E:\CODE\Bureaucrazy Temp\frontend\src\middleware.js
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

function isProtectedPath(pathname) {
  return pathname.startsWith("/");
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    return auth0.middleware(request);
  }

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const session = await auth0.getSession(request);

  if (!session) {
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|.*\\..*).*)"],
};
