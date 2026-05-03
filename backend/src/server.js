import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import serviceRoutes from "./routes/service.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ── Security & Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/services", serviceRoutes);

// Health check
app.get("/api/health", (_, res) => res.json({ status: "OK", timestamp: new Date() }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use(errorHandler);

// ── DB + Start ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/doctor_appointment";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

export default app;
