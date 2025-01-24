import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseConnection } from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { RowDataPacket } from 'mysql2/promise';

export async function PUT(req: NextRequest) {
  try {
    // Check if connection can be established
    const connection = await getDatabaseConnection();
    if (!connection) {
      return NextResponse.json(
        { success: false, message: 'Database connection failed' },
        { status: 500 }
      );
    }

      const formData = await req.formData();
      console.log('Form data entries:', Array.from(formData.entries()));
    
    // Validate required fields
    const id_dokter = formData.get('id_dokter');
    const Nama_Dokter = formData.get('Nama_Dokter');
    const Jenis_Spesialis = formData.get('Jenis_Spesialis');
    
      if (!id_dokter || !Nama_Dokter || !Jenis_Spesialis) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

      // Check if doctor exists
      const [existingDoctor] = await connection.execute<RowDataPacket[]>(
        'SELECT id_dokter FROM dokter WHERE id_dokter = ?',
        [id_dokter]
      );

      if (!existingDoctor[0]) {
        return NextResponse.json(
          { success: false, message: 'Doctor not found' },
          { status: 404 }
        );
      }

      // Handle file upload if present
      const file = formData.get('file') as File | null;
      let photoPath = null;

      if (file) {
        try {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const filename = `${Date.now()}-${file.name}`;
          const uploadDir = path.join(process.cwd(), 'public/dokter');
          const uploadPath = path.join(uploadDir, filename);
          
          await writeFile(uploadPath, buffer);
          photoPath = `/dokter/${filename}`;

          // Delete old photo
          const [oldPhoto] = await connection.execute<RowDataPacket[]>(
            'SELECT Foto_Dokter FROM dokter WHERE id_dokter = ?',
            [id_dokter]
          );

          if (oldPhoto[0]?.Foto_Dokter) {
            await unlink(path.join(process.cwd(), 'public', oldPhoto[0].Foto_Dokter))
              .catch(console.error);
          }
        } catch (fileError) {
          console.error('File handling error:', fileError);
          return NextResponse.json(
            { success: false, message: 'Error handling file upload' },
            { status: 500 }
          );
        }
      }

      // Update database
      const updateQuery = photoPath 
        ? 'UPDATE dokter SET Nama_Dokter = ?, Jenis_Spesialis = ?, Foto_Dokter = ? WHERE id_dokter = ?'
        : 'UPDATE dokter SET Nama_Dokter = ?, Jenis_Spesialis = ? WHERE id_dokter = ?';
      
      const updateParams = photoPath 
        ? [Nama_Dokter, Jenis_Spesialis, photoPath, id_dokter]
        : [Nama_Dokter, Jenis_Spesialis, id_dokter];

      await connection.execute(updateQuery, updateParams);

      return NextResponse.json({ 
        success: true,
        message: 'Doctor updated successfully'
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Database operation failed' },
        { status: 500 }
      );
    }

}