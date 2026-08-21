import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import serviceRoutes from "./routes/services.js";
import requestRoutes from "./routes/requests.js";
import reviewRoutes from "./routes/reviews.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { seedServices } from "./seed/services.js";

const app = express();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing. Create server/.env from server/.env.example.");
}
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing.");
}

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  process.env.ADMIN_URL || "http://localhost:5174"
].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS."));
  }
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 80,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." }
});

app.get("/api/health", (req, res) => res.json({ ok: true, service: "safex-api" }));
app.use("/api/auth", publicWriteLimiter, authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", publicWriteLimiter, requestRoutes);
app.use("/api/reviews", publicWriteLimiter, reviewRoutes);

app.use(notFound);
app.use(errorHandler);

let isConnected = false;
export async function ensureDbConnected() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  await seedServices();
}

export default app;
