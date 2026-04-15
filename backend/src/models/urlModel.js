import { pool } from "../db/db.js";

// Create short URL
export async function createUrl(userId, shortCode, originalUrl) {
  const [result] = await pool.execute(
    `INSERT INTO urls (user_id, short_code, original_url)
     VALUES (?, ?, ?)`,
    [userId, shortCode, originalUrl]
  );

  return result.insertId;
}

// Get URL by short code (for redirect)
export async function findUrlByShortCode(shortCode) {
  const [rows] = await pool.execute(
    `SELECT * FROM urls WHERE short_code = ? AND is_active = TRUE`,
    [shortCode]
  );

  return rows[0];
}

// Get all URLs for a user
export async function getUrlsByUser(userId) {
  const [rows] = await pool.execute(
    `SELECT * FROM urls WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
}

// Delete URL
export async function deleteUrl(urlId, userId) {
  await pool.execute(
    `DELETE FROM urls WHERE id = ? AND user_id = ?`,
    [urlId, userId]
  );
}