import express from "express";
import { redirect } from "../controllers/redirectController.js";

const router = express.Router();

// GET /:shortCode
router.route("/:shortCode").get(redirect);

export default router;
