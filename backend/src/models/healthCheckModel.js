import { pool } from "../db/db.js";

async function checkDbConnection() {
  try {
    await pool.execute("SELECT 1");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

export { checkDbConnection };
