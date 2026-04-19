import express from "express";
import { createShortUrl, getUserUrls } from "../controllers/urlController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/v1/urls
router.route("/").post(authenticate, createShortUrl);

// GET /api/v1/urls
router.route("/").get(authenticate, getUserUrls);

export default router;
