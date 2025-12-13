//E:\CODE\Bureaucrazy Temp\frontend\src\proxy.js
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";
import jwt from "jsonwebtoken";
const PUBLIC_PATHS = [];

function isPublicPath(pathname) {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath + "/"));
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const country = request.geo?.country;

  if (country && country !== "NP") {
    return new NextResponse("Service available only in Nepal", { status: 403 });
  }

  if (pathname.startsWith("/auth")) {
    return auth0.middleware(request);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = await auth0.getSession(request);

  if (!session) {
    const loginUrl = new URL("/auth/login", request.nextUrl.origin);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    const decoded = jwt.decode(session.tokenSet?.idToken || "");

    if (!decoded?.privilege?.includes("Admin")) {
      return new NextResponse("Access forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|.*\\..*).*)"],
};
