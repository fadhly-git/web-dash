import { NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";

export async function GET() {
  try {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.query(`
      SELECT * 
      FROM dokter 
      ORDER BY id_dokter ASC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch doctors" + error },
      { status: 500 }
    );
  }
}
