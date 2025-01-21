import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const { username, password, rememberMe } = await req.json();

    // Dummy user validation
    if (username === 'user' && password === '') {
      try {
        const token = jwt.sign({ username }, 'fadhly gantenk sekali', { expiresIn: rememberMe ? '7d' : '1h' });

        const response = NextResponse.json({ success: true, message: 'Login successful' });
        response.headers.set('Set-Cookie', serialize('token', token, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: rememberMe ? 7 * 24 * 60 * 60 : 60 * 60,
        }));

        return response;
      } catch (error: any) {
        return NextResponse.json({ success: false, message: 'Error generating token', error: error.message }, { status: 500 });
      }
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}