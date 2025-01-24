import { NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";

export async function GET() {
  try {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.query(`
                        SELECT s.id, s.id_dokter, s.hari, s.jam_praktek, s.status, d.Nama_Dokter, d.Foto_Dokter
                        FROM status s
                        JOIN dokter d ON s.id_dokter = d.id_dokter
                `);
    const data = rows;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
