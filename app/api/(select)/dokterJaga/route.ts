import { NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";

export async function GET() {
  try {
    const connection = await getDatabaseConnection();

    // Dapatkan hari ini dalam format yang sesuai
    const today = new Date().getDay(); // getDay() mengembalikan angka 0-6 (0 = Minggu, 1 = Senin, ..., 6 = Sabtu)
    const todayId = today === 0 ? 7 : today; // Ubah 0 (Minggu) menjadi 7

    // Query untuk mendapatkan data dan mengurutkannya berdasarkan hari dan nama dokter
    const [rows] = await connection.query(`
      SELECT s.hari, s.jam_praktek, s.status, d.Nama_Dokter
      FROM status s
      JOIN dokter d ON s.id_dokter = d.id_dokter
      WHERE s.hari = ? AND s.status = 'Aktif'
      ORDER BY s.hari, d.Nama_Dokter
    `, [todayId]);

    const data = rows;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data: " + error },
      { status: 500 }
    );
  }
}