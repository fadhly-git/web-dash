import pool from "@lib/pool";
import { RowDataPacket } from "mysql2";
import {
  encryptPassword,
  decryptPassword,
  generateRsaKeyPair,
} from "@utils/encryption";
export interface IUser {
  id?: number;
  username: string;
  password: string;
  created_at?: Date;
}

export interface UserRow extends IUser, RowDataPacket {}

export class User implements IUser {
  id?: number;
  username: string;
  password: string;
  created_at?: Date;

  constructor(data: IUser) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.created_at = data.created_at;
  }

  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0] ? new User(rows[0]) : null;
  }

  static async findLastId(): Promise<number> {
    const [rows] = await pool.execute<UserRow[]>(
      "SELECT id FROM users ORDER BY id DESC LIMIT 1"
    );
    return rows[0].id ? rows[0].id : 0;
  }

  static async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows[0] ? new User(rows[0]) : null;
  }

  static async create(userData: {
    username: string;
    password: string;
  }): Promise<User> {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Generate and store RSA keys
      const { publicKey, privateKey } = generateRsaKeyPair();
      await connection.execute(
        "INSERT INTO rsa_keys (key_name, public_key, private_key) VALUES (?, ?, ?)",
        [`${userData.username}-key`, publicKey, privateKey]
      );

      // Encrypt password with public key
      const encryptedPassword = encryptPassword(userData.password, publicKey);

      // Create user with encrypted password
      const [result] = await connection.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [userData.username, encryptedPassword]
      );

      await connection.commit();
      return new User({ ...userData, id: (result as any).insertId });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findAll(): Promise<User[]> {
    const [rows] = await pool.execute<UserRow[]>("SELECT * FROM users");
    return rows.map((row) => new User(row));
  }

  async delete(): Promise<void> {
    if (!this.id) throw new Error("Cannot delete user without ID");
    await pool.execute("DELETE FROM users WHERE id = ?", [this.id]);
  }

  async update(data: Partial<IUser>): Promise<void> {
    if (!this.id) throw new Error("Cannot update user without ID");
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(data);
    await pool.execute(`UPDATE users SET ${fields} WHERE id = ?`, [
      ...values,
      this.id,
    ]);
  }

  static async verifyPassword(
    username: string,
    password: string
  ): Promise<boolean> {
    const connection = await pool.getConnection();
    try {
      const [userRows] = await connection.execute<UserRow[]>(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (userRows.length === 0) return false;

      const user = new User(userRows[0]);

      const [keyRows] = await connection.execute<UserRow[]>(
        "SELECT private_key FROM rsa_keys WHERE key_name = ?",
        [`${username}-key`]
      );
      if (keyRows.length === 0) return false;

      const privateKey = keyRows[0].private_key;
      const decryptedPassword = decryptPassword(user.password, privateKey);

      return decryptedPassword === password;
    } finally {
      connection.release();
    }
  }
}
