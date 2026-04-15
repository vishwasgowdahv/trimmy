import { Router } from "express";
import { healthCheck } from "../controllers/healthcheckContoller.js";

const router = Router();

router.route("/").get(healthCheck);

export default router;
