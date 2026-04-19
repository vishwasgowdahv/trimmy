import { pool } from "../db/db.js";

// Create user (with verification token)
async function createUser(
  name,
  email,
  passwordHash,
  verificationToken,
  verificationExpires,
) {
  const [result] = await pool.execute(
    `INSERT INTO users 
    (name, email, password_hash, email_verification_token, email_verification_expires)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, passwordHash, verificationToken, verificationExpires],
  );

  return result.insertId;
}

// Find user by email
async function findUserByEmail(email) {
  const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

// Verify email
async function verifyUserEmail(token) {
  const [result] = await pool.execute(
    `UPDATE users
     SET is_email_verified = TRUE,
         email_verification_token = NULL,
         email_verification_expires = NULL
     WHERE email_verification_token = ?
       AND email_verification_expires > NOW()`,
    [token],
  );

  return result.affectedRows;
}

// Save refresh token
async function saveRefreshToken(userId, token, expires) {
  await pool.execute(
    `UPDATE users 
     SET refresh_token = ?, refresh_token_expires = ?
     WHERE id = ?`,
    [token, expires, userId],
  );
}

// Set forgot password token
async function setResetToken(userId, token, expires) {
  await pool.execute(
    `UPDATE users
     SET reset_password_token = ?, reset_password_expires = ?
     WHERE id = ?`,
    [token, expires, userId],
  );
}

// Reset password
async function resetPassword(token, newPasswordHash) {
  const [result] = await pool.execute(
    `UPDATE users
     SET password_hash = ?,
         reset_password_token = NULL,
         reset_password_expires = NULL
     WHERE reset_password_token = ?
       AND reset_password_expires > NOW()`,
    [newPasswordHash, token],
  );

  return result.affectedRows;
}

export {
  createUser,
  findUserByEmail,
  verifyUserEmail,
  saveRefreshToken,
  setResetToken,
  resetPassword,
};
