import express from "express";
import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPasswordController,
} from "../controllers/authController.js";

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

export default router;
