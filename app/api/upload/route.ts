import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const VALID_DAYS = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const doctorName = formData.get("doctorName") as string;
    const specialization = formData.get("specialization") as string;
    const practiceHours = formData.get("practiceHours") as string;
    const isActive = formData.get("isActive") as string;

    // Single validation for practice days
    const inputDays = (formData.get("practiceDays") as string)
      .split(",")
      .map((day) => {
        const trimmed = day.trim().toLowerCase();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      })
      .filter(Boolean);

    console.log("Input days:", inputDays);

    // Validate each day
    const invalidDays = inputDays.filter((day) => !VALID_DAYS.includes(day));
    if (invalidDays.length > 0) {
      console.log("Invalid days found:", invalidDays);
      return NextResponse.json(
        {
          success: false,
          message: `Invalid days: ${invalidDays.join(
            ", "
          )}. Use: ${VALID_DAYS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Format days exactly as required by DB
    const formattedDays = inputDays.join(", ");
    console.log("Formatted days:", formattedDays);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), "public/dokter", filename);
    await writeFile(filepath, buffer);

    const doctorPhoto = `/dokter/${filename}`;

    const connection = await getDatabaseConnection();
    console.log("Inserting with days:", formattedDays);

    const [result] = await connection.execute(
      "INSERT INTO dokter (Nama_Dokter, Hari_Praktek, Jam_Praktek, Foto_Dokter, Status, Jenis_Spesialis) VALUES (?, ?, ?, ?, ?, ?)",
      [
        doctorName,
        formattedDays,
        practiceHours,
        doctorPhoto,
        isActive ? "AKTIF" : "CUTI",
        specialization,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.sqlMessage || error.message,
      },
      { status: 500 }
    );
  }
}
