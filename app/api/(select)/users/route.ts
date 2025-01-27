import { NextRequest, NextResponse } from 'next/server';
import pool from '@lib/pool';
import { UserRow } from '@models/User';

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.execute<UserRow[]>('SELECT * FROM users');
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}