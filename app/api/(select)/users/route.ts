import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseConnection } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const secret = process.env.JWT_SECRET || 'fadhly gantenk sekali';

// POST handler untuk login
export async function POST(req: NextRequest) {
  try {
    const { username, password, rememberMe } = await req.json();
    const connection = await getDatabaseConnection();
    const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: rememberMe ? '7d' : '1h' }
    );

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.headers.set(
      'Set-Cookie',
      serialize('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: rememberMe ? 7 * 24 * 60 * 60 : 60 * 60,
      })
    );

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Database error', error: error.message },
      { status: 500 }
    );
  }
}