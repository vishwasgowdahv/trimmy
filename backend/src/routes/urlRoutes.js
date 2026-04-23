import express from "express";
import {
  createShortUrl,
  getUserUrls,
  deleteUrlController,
} from "../controllers/urlController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createUrlLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// POST /api/v1/urls
router.route("/").post(authenticate, createUrlLimiter, createShortUrl);

// GET /api/v1/urls
router.route("/").get(authenticate, getUserUrls);

// DELETE /api/v1/urls/:urlId
router.route("/:urlId").delete(authenticate, deleteUrlController);

export default router;
