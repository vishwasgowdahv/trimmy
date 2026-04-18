import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import {
  createUser,
  findUserByEmail,
  verifyUserEmail,
  saveRefreshToken,
  setResetToken,
  resetPassword,
} from "../models/userModel.js";

import {
  sendVerificationEmail,
  sendResetEmail,
} from "../services/mailServices.js";

import { ENV } from "../config/env.js";
import { ApiResponse } from "../utils/api-response.js";

// SIGNUP
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const userId = await createUser(
      name,
      email,
      hashed,
      token,
      expires
    );
    
    await sendVerificationEmail(email, token);

    res.status(201).json({
      message: "Signup successful. Verify your email.",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// VERIFY EMAIL
async function verifyEmail(req, res) {
  const { token } = req.query;

  const success = await verifyUserEmail(token);

  if (!success) {
    return res.status(400).json({ message: "Invalid/expired token" });
  }

  res.json({ message: "Email verified successfully" });
}

// LOGIN
async function login(req, res) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.is_email_verified) {
    return res.status(403).json({ message: "Verify email first" });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = jwt.sign({ id: user.id }, ENV.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user.id }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await saveRefreshToken(user.id, refreshToken, expiry);

  res.json({ accessToken, refreshToken });
}

// FORGOT PASSWORD
async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.json({ message: "If exists, email sent" });

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 1 * 60 * 60 * 1000);

  await setResetToken(user.id, token, expiry);

  await sendResetEmail(email, token);

  res.json({ message: "Reset email sent" });
}

// RESET PASSWORD
async function resetPasswordController(req, res) {
  const { token, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const success = await resetPassword(token, hashed);

  if (!success) {
    return res.status(400).json({ message: "Invalid/expired token" });
  }

  res.json({ message: "Password reset successful" });
};

export { signup, verifyEmail, login, forgotPassword, resetPasswordController };
