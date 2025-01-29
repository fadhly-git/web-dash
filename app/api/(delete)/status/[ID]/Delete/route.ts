import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db"; // Assuming the function exists in your db lib

export async function DELETE(request: NextRequest) {
  try {
    const connection = await getDatabaseConnection();

    const { id } = await request.json();

    const params = "DELETE FROM status WHERE id = ?";
    const [result] = await connection.execute(params, [id]);

    // const [result] = await connection.execute(
    //     "DELETE FROM status WHERE id = ?",
    //     [id]
    // );

    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result as any)[0]?.affectedRows === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Status deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting status " + error },
      { status: 500 }
    );
  }
}
