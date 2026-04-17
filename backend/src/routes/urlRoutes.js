import express from "express";
import {
  createShortUrl,
  getUserUrls,
} from "../controllers/urlController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/v1/urls  GET /api/v1/urls
router.route("/").post(authenticate, createShortUrl).get(authenticate, getUserUrls);

export default router;