import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export const POST = async (req: NextRequest) => {
  // Clear the token cookie
  const response = NextResponse.json({
    success: true,
    message: "Logout successful",
  });

  response.headers.set(
    "Set-Cookie",
    serialize("token", "", {
      path: "/",
      httpOnly: true,
      maxAge: -1, // Invalidate cookie immediately
    })
  );

  return response;
};
