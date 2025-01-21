import mysql, { ConnectionOptions, Connection } from 'mysql2/promise';

let connection: Connection | null = null;

export async function getDatabaseConnection(): Promise<Connection> {
  if (!connection) {
    const dbConfig: ConnectionOptions = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    connection = await mysql.createConnection(dbConfig);
  }
  return connection;
}
