import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnection } from "@/lib/db";
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(req: NextRequest) {
  try {
    const connection = await getDatabaseConnection();
    const { id_dokter, Foto_Dokter } = await req.json();

    // Delete photo if exists
    if (Foto_Dokter) {
      const filePath = path.join(process.cwd(), 'public', Foto_Dokter);
      if (filePath.startsWith(path.join(process.cwd(), 'public/dokter'))) {
        await unlink(filePath).catch(console.error);
      }
    }

    // Delete doctor record
    const [result] = await connection.execute(
      'DELETE FROM dokter WHERE id_dokter = ?',
      [id_dokter]
    );

    if ((result as any)[0]?.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Doctor deleted successfully`
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete doctor' },
      { status: 500 }
    );
  }
}