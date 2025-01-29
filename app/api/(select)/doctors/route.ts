import { NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";

export async function POST() {
  const db = await getDatabaseConnection();
  const [rows] = await db.execute("SELECT * FROM dokter");
  const dokter = rows;
  return NextResponse.json(dokter);
}

export async function GET() {
  try {
    const db = await getDatabaseConnection();
    const [rows] = await db.execute(
      "SELECT * FROM dokter ORDER BY id_dokter asc"
    );
    const dokter = rows;
    return NextResponse.json(dokter);
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal mengambil data dokter",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
