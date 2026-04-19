import express from "express";
import { getUrlAnalytics } from "../controllers/analyticsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/v1/analytics/:urlId
router.route("/:urlId").get(authenticate, getUrlAnalytics);

export default router;
