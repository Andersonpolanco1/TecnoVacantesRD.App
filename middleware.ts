import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const signInPath = "/p/signIn";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/p/home", req.url));
  }

  if (token && req.nextUrl.pathname === signInPath) {
    return NextResponse.redirect(new URL("/p/home", req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(signInPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/p/signIn", "/dashboard/:path*"],
};
