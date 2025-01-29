import { NextRequest, NextResponse } from "next/server";
import { User } from "@models/User";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.JWT_SECRET || "fadhly gantenk sekali";

export async function POST(req: NextRequest) {
  const { username, password, rememberMe } = await req.json();

  try {
    const isValid = await User.verifyPassword(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: username, username }, secret, {
      expiresIn: rememberMe ? "7d" : "1h",
    });

    // Set cookie with JWT token
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: rememberMe ? 7 * 24 * 60 * 60 : 60 * 60,
      })
    );

    return response;
  } catch (error: unknown) {
    console.error("Error during login:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
