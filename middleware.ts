import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  /* =====================
        ADMIN PROTECTION
  ===================== */

  if (pathname.startsWith("/admin")) {

    // ❌ مش مسجل دخول
    if (!token) {
      return NextResponse.rewrite(
        new URL("/404", req.url)
      );
    }

    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      // ❌ مش ادمن
      if (decoded.role !== "admin") {
        return NextResponse.rewrite(
          new URL("/404", req.url)
        );
      }

      // ✅ admin
      return NextResponse.next();

    } catch {
      return NextResponse.rewrite(
        new URL("/404", req.url)
      );
    }
  }

  /* =====================
      PROFILE PROTECTION
  ===================== */

  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }

  /* =====================
      AUTH PAGES BLOCK
  ===================== */

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    if (token) {
      return NextResponse.redirect(
        new URL("/profile", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};