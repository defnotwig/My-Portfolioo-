import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { seedContent } from "./data/seedData.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import kbRoutes from "./routes/kbRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { longCache } from "./middleware/cache.js";
import serverless from "serverless-http";

const app = express();

const allowedOrigins = [
  process.env.CLIENT_ORIGIN || "http://localhost:3501",
  "http://localhost:3502",
  "http://localhost:3503",
  "http://localhost:3504",
  "http://localhost:3505",
  "http://localhost:4173",
  // Vercel deployment URLs
  "https://gabriel-ludwig-rivera.vercel.app",
  "https://gabrielludwig.dev",
  // Allow all Vercel preview deployments
  /\.vercel\.app$/,
];

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) {
      callback(null, true);
      return;
    }
    
    // Check against allowed origins (strings and regex patterns)
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Apply caching to static content routes
app.use("/api/about", longCache, aboutRoutes);
app.use("/api/experience", longCache, experienceRoutes);
app.use("/api/projects", longCache, projectRoutes);
app.use("/api/certifications", longCache, certificationRoutes);
app.use("/api/recommendations", longCache, recommendationRoutes);
app.use("/api/chat", chatRoutes); // No caching for chat
app.use("/api/kb", longCache, kbRoutes);

app.use(notFound);
app.use(errorHandler);

let dbConnected = false;
const handler = serverless(app);

async function ensureDbConnected() {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log("✅ Database connection established");
      
      // Run seed only when explicitly requested (avoid destructive ops on cold starts)
      if (process.env.SEED_ON_BOOT === "true") {
        try {
          await seedContent();
        } catch (err) {
          console.error("Seed error:", err);
        }
      }
    } catch (error) {
      console.error("❌ Failed to connect to database:", error.message);
      throw error;
    }
  }
}

export default async function (req, res) {
  try {
    await ensureDbConnected();
    return handler(req, res);
  } catch (error) {
    console.error("❌ Serverless function error:", error);
    return res.status(500).json({ 
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "production" 
        ? "Unable to connect to database" 
        : error.message 
    });
  }
}

