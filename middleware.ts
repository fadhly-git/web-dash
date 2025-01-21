import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode('fadhly gantenk sekali');

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  // Jangan arahkan ulang jika pengguna berada di halaman login atau mengakses resource statis atau API
  if (request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/static') || request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

// Tambahkan logika untuk memeriksa ukuran body permintaan
export async function onRequest(context: { request: NextRequest }) {
  const { request } = context;
  const contentLength = request.headers.get('content-length');
  const maxBodySize = 10 * 1024 * 1024; // 10 MB

  if (contentLength && parseInt(contentLength, 10) > maxBodySize) {
    return new NextResponse('Body size exceeds the 10 MB limit', { status: 413 });
  }

  return NextResponse.next();
}