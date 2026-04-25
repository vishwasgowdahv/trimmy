import express from "express";
import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPasswordController,
  refreshToken,
  getUser,
  updateProfile,
  changePassword
} from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/v1/auth/signup
router.route("/signup").post(authLimiter, signup);

// POST /api/v1/auth/login
router.route("/login").post(authLimiter, login);

// POST /api/v1/auth/verify-email
router.route("/verify-email").get(authLimiter, verifyEmail);

// POST /api/v1/auth/forgot-password
router.route("/forgot-password").post(authLimiter, forgotPassword);

// POST /api/v1/auth/reset-password
router.route("/reset-password").post(authLimiter, resetPasswordController);

// PUT /api/v1/auth/update-profile
router.route("/update-profile").put(authenticate, updateProfile);

// PUT /api/v1/auth/update-password
router.route("/update-password").put(authenticate, changePassword);

// POST /api/v1/auth/refresh
router.route("/refresh").post(refreshToken);

// GET /api/v1/auth/me
router.route("/me").get(authenticate, getUser);

export default router;
