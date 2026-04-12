
import mysql from "mysql2/promise";
import { ENV } from "../config/env.js";


const pool = mysql.createPool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Connected");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

export { pool, testConnection };
