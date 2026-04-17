import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// POST /api/v1/auth/signup
router.route("/signup").post(signup);

// POST /api/v1/auth/login
router.route("/login").post(login);

export default router;