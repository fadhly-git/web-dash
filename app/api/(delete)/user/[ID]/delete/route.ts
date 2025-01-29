import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import pool from "@lib/pool";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Check if user exists
    const user = await User.findById(parseInt(id));
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Delete user
    await user.delete();

    await connection.commit();
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    await connection.rollback();
    return NextResponse.json(
      { success: false, message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
