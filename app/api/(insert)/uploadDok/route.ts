import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const doctorName = formData.get("doctorName") as string;
    const specialization = formData.get("specialization") as string;;

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

    const [result] = await connection.execute(
      "INSERT INTO dokter (Nama_Dokter, Foto_Dokter, Jenis_Spesialis) VALUES (?, ?, ?)",
      [
        doctorName,
        doctorPhoto,
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
