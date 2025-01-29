import type { NextApiResponse } from "next";
import { getDatabaseConnection } from "@lib/db";

export default async function handler(res: NextApiResponse) {
  try {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.execute("SELECT * FROM users");
    res.status(200).json({ success: true, data: rows });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res.status(500).json({ success: false, message });
  }
}
