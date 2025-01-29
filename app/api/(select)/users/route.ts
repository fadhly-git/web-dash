import { NextResponse } from "next/server";
import pool from "@lib/pool";
import { UserRow } from "@models/User";

export async function GET() {
  try {
    const [rows] = await pool.execute<UserRow[]>("SELECT * FROM users");
    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
