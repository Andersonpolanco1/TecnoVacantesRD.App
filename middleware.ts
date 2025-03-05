import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const signInPath = "/signIn"; // Ruta de inicio de sesión

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si está logueado y trata de acceder a /signIn, redirige a la página principal
  if (token && req.nextUrl.pathname === signInPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Si no está logueado y trata de acceder a una ruta protegida, redirige a /signIn
  if (!token && req.nextUrl.pathname.startsWith("/vacancies/mine")) {
    return NextResponse.redirect(new URL(signInPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signIn", "/vacancies/mine/:path*"],
};
