import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db"; 

export async function POST(request: NextRequest) {
  try {
    const connection = await getDatabaseConnection();

    const formData = await request.formData();
    const id_dokter = formData.get("doctorId") as string;
    const hari = formData.get("practiceDays") as string;
    const jam_praktek = formData.get("practiceHours") as string;
    let status = formData.get("isActive") as string;
    const isActive = status === "true" ? "Aktif" : "Cuti";

    // Validasi data yang diterima
    if (!id_dokter || !jam_praktek || !jam_praktek || isActive === undefined) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Check if doctor already has a schedule for the same day
    const checkQuery = `
      SELECT COUNT(*) as count 
      FROM status 
      WHERE id_dokter = ? AND hari = ?
    `;
    const [rows] = await connection.execute(checkQuery, [id_dokter, hari]);
    const count = (rows as any)[0].count;

    if (count > 0) {
      return NextResponse.json(
        { success: false, message: "Dokter sudah memiliki jadwal di hari tersebut" },
        { status: 400 }
      );
    }

    // Query untuk memasukkan data ke tabel status
    const query = `
      INSERT INTO status (id_dokter, hari, jam_praktek, status)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await connection.execute(query, [id_dokter, hari, jam_praktek, isActive]);

    // Mengembalikan respons sukses jika data berhasil dimasukkan
    return NextResponse.json(
      { success: true, message: "Data berhasil dimasukkan" },
      { status: 200 }
    );
  } catch (error) {
    // Menangani kesalahan dan mengembalikan respons kesalahan
    console.error("Kesalahan saat memasukkan data:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memasukkan data" },
      { status: 500 }
    );
  }
}