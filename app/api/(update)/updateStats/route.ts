import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const doctorId = formData.get("id_dokter");
    const day = formData.get("hari");
    const practiceHours = formData.get("jam_praktek");
    const Active = formData.get("status");
    const isActive = Active == "true" ? "Aktif" : "Cuti";

    const connection = await getDatabaseConnection();

    // Check if connection can be established
    if (!connection) {
      return NextResponse.json(
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!doctorId || !day || !practiceHours || !isActive) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update doctor stats
    await connection.execute(
      "UPDATE status SET hari = ?, jam_praktek = ?, status = ? WHERE id = ? AND id_dokter = ?",
      [day, practiceHours, isActive, id, doctorId]
    );

    return NextResponse.json({
      success: true,
      message: "Data updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update doctor stats" + error },
      { status: 500 }
    );
  }
}
