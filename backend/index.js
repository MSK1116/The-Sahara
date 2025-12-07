import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import hpp from "hpp";

import las from "./routes/las.routes.js";

dotenv.config();

const app = express();
const allowedOrigins = [];
if (process.env.frontend_url) allowedOrigins.push(process.env.frontend_url);

app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser tools or same-origin (no origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// security middlewares
app.use(express.json({ limit: "50kb" }));
app.use(hpp());
app.set("trust proxy", true);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODBURI;

if (!MONGODB_URI) {
  console.error("MONGODBURI not set in environment variables!");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello hacker");
});

// apply a general rate limiter
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
});

app.use(generalLimiter);

app.use("/las", las);

// basic error handler to avoid stack leaks
app.use((err, req, res, next) => {
  console.error(err);
  if (err && err.message && err.message.includes("CORS")) {
    return res.status(403).json({ error: "CORS policy: Access denied" });
  }
  return res.status(500).json({ error: "Internal server error" });
});
