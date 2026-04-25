import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  verifyUserEmail,
  saveRefreshToken,
  setResetToken,
  resetPassword,
  findUserById,
  updateProfile as updateProfileModel,
  updatePassword as updatePasswordModel
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

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json(new ApiResponse(400, null, "User exists"));
    }

    const hashed = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const userId = await createUser(name, email, hashed, token, expires);

    await sendVerificationEmail(email, token);

    res
      .status(201)
      .json(
        new ApiResponse(201, userId, "Signup successful. Verify your email."),
      );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// VERIFY EMAIL
async function verifyEmail(req, res) {
  const { token } = req.query;

  const success = await verifyUserEmail(token);

  if (!success) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid/expired token"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified successfully"));
}

// LOGIN
async function login(req, res) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user)
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid credentials"));

  if (!user.is_email_verified) {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "Verify email first"));
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match)
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid credentials"));

  const accessToken = jwt.sign({ id: user.id }, ENV.JWT_SECRET, {
    expiresIn: "2d",
  });

  const refreshToken = jwt.sign({ id: user.id }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await saveRefreshToken(user.id, refreshToken, expiry);

  res
    .status(200)
    .json(
      new ApiResponse(200, { accessToken, refreshToken }, "Login Successful"),
    );
}

// FORGOT PASSWORD
async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user)
    return res
      .status(200)
      .json(new ApiResponse(200, null, "If exists, email sent"));

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 1 * 60 * 60 * 1000);

  await setResetToken(user.id, token, expiry);

  await sendResetEmail(email, token);

  res.status(200).json(new ApiResponse(200, null, "Reset email sent"));
}

// RESET PASSWORD
async function resetPasswordController(req, res) {
  const { token, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const success = await resetPassword(token, hashed);

  if (!success) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid/expired token"));
  }

  res.status(200).json(new ApiResponse(200, null, "Password reset successful"));
}

// UPDATE PROFILE
async function updateProfile(req, res) {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json(new ApiResponse(400, null, "Name is required"));
    }

    await updateProfileModel(userId, name);
    res.status(200).json(new ApiResponse(200, null, "Profile updated successfully"));
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// CHANGE PASSWORD
async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await findUserById(userId);
    const match = await bcrypt.compare(oldPassword, user.password_hash);

    if (!match) {
      return res.status(400).json(new ApiResponse(400, null, "Incorrect old password"));
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await updatePasswordModel(userId, hashed);

    res.status(200).json(new ApiResponse(200, null, "Password updated successfully"));
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// REFRESH TOKEN
async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Refresh token required"));
  }

  const user = await findUserByRefreshToken(refreshToken);

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid or expired refresh token"));
  }

  const accessToken = jwt.sign({ id: user.id }, ENV.JWT_SECRET, {
    expiresIn: "15m",
  });

  res
    .status(200)
    .json(new ApiResponse(200, { accessToken }, "Token refreshed"));
}

// GET USER
async function getUser(req, res) {
  const user = await findUserById(req.user.id);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
}

export {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPasswordController,
  refreshToken,
  getUser,
  updateProfile,
  changePassword
};
