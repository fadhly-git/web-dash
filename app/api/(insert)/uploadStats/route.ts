import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id_dokter = formData.get("doctorId") as string;
    const hari = formData.get("practiceDays") as string;
    const jam_praktek = formData.get("practiceHours") as string;
    let status = formData.get("isActive") as string;
      
    status = status === "true" ? "Aktif" : "Cuti";

    if (!id_dokter || !hari || !jam_praktek || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const connection = await getDatabaseConnection();
    const [result] = await connection.execute(
      "INSERT INTO status (id_dokter, hari, jam_praktek, status) VALUES (?, ?, ?, ?)",
      [id_dokter, hari, jam_praktek, status]
    );

    return NextResponse.json({
      message: "Data inserted successfully",
      data: { id_dokter, hari, jam_praktek, status },
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Error inserting data" + error },
      { status: 500 }
    );
  }
}
