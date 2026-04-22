import express from "express";
import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPasswordController,
  refreshToken,
  getUser,
} from "../controllers/authController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/v1/auth/signup
router.route("/signup").post(signup);

// POST /api/v1/auth/login
router.route("/login").post(login);

// POST /api/v1/auth/verify-email
router.route("/verify-email").get(verifyEmail);

// POST /api/v1/auth/forgot-password
router.route("/forgot-password").post(forgotPassword);

// POST /api/v1/auth/reset-password
router.route("/reset-password").post(resetPasswordController);

// POST /api/v1/auth/refresh
router.route("/refresh").post(refreshToken);

// GET /api/v1/auth/me
router.route("/me").get(authenticate, getUser);

export default router;
