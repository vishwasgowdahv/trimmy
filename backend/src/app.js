import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    path: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// import routes
import healthcheckRoute from "./routes/healthcheckRoutes.js";
import authRoute from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import redirectRoutes from "./routes/redirectRoutes.js";

app.use("/api/v1/healthcheck", healthcheckRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/urls", urlRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

// Public redirect route (must be last)
app.use("/", redirectRoutes);

export default app;
