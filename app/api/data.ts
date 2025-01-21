import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabaseConnection } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.execute('SELECT * FROM users');
    res.status(200).json({ success: true, data: rows });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
