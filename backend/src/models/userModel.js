import { pool } from "../db/db.js";

// Create user
async function createUser(name, email, passwordHash) {
  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password_hash)
     VALUES (?, ?, ?)`,
    [name, email, passwordHash]
  );

  return result.insertId;
}

// Find user by email
async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return rows[0];
}

// Find user by ID
async function findUserById(id) {
  const [rows] = await pool.execute(
    `SELECT id, name, email FROM users WHERE id = ?`,
    [id]
  );

  return rows[0];
}

export { createUser, findUserByEmail, findUserById };