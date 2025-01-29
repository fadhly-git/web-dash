import { NextRequest, NextResponse } from "next/server";
import pool from "@lib/pool";
import { generateRsaKeyPair, encryptPassword } from "@utils/encryption";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const connection = await pool.getConnection();

  try {
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    // Generate keys first to ensure they're valid
    const { publicKey, privateKey } = generateRsaKeyPair();
    const encryptedPassword = encryptPassword(password, publicKey);

    // Insert user and get ID
    const [userResult] = await connection.execute<ResultSetHeader>(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, encryptedPassword]
    );

    // Validate insertId exists
    if (!userResult.insertId) {
      await connection.rollback();
      throw new Error("Failed to create user - no ID returned");
    }

    // Insert RSA keys with validated user ID
    await connection.execute(
      "INSERT INTO rsa_keys (id_user, key_name, public_key, private_key) VALUES (?, ?, ?, ?)",
      [userResult.insertId, `${username}-key`, publicKey, privateKey]
    );

    await connection.commit();
    return NextResponse.json({
      success: true,
      userId: userResult.insertId,
    });
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    console.error("Upload error:", error);
    await connection.rollback();

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { success: false, error: "Username already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
