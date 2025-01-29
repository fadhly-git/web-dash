import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie ? tokenCookie.value : null;

  // Allow access to images in the public folder
  if (
    request.nextUrl.pathname.startsWith("/public") &&
    /\.(png|jpg|jpeg|gif|svg)$/.test(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  // Jangan arahkan ulang jika pengguna berada di halaman login, halaman utama, atau mengakses resource statis atau API
  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/public") ||
    request.nextUrl.pathname.startsWith("/dokter")
  ) {
    return NextResponse.next();
  }

  // Blokir akses ke jalur /master jika tidak ada token
  if (request.nextUrl.pathname === "/master" && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    // Jika token valid dan pengguna mengakses halaman utama, arahkan ke /master
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/master", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}
