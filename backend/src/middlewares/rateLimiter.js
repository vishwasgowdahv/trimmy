import rateLimit from "express-rate-limit";

import { ApiResponse } from "../utils/api-response.js";

// 🔐 Auth limiter (strict)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // max 10 requests
  message: new ApiResponse(
    429,
    null,
    "Too many attempts. Try again after some time (15 Minutes)",
  ),
  standardHeaders: true,
  legacyHeaders: false,
});

// 🌐 General API limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // per IP
  message: new ApiResponse(
    429,
    null,
    "Too many requests. Please slow down (15 Minutes)",
  ),
});

// 🔗 URL creation limiter (prevent spam)
export const createUrlLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: new ApiResponse(
    429,
    null,
    "URL creation limit exceeded. Try again after some time (1 Hour)",
  ),
});
