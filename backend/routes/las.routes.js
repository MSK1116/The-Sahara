import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { addOfficer, getAllBranchSlugs, getApplicant, getBranch, getLMSIN, getOfficers, getRecentHistory, removeOfficer, transferEmployee, upsertLAS } from "../controllers/las.controller.js";
import rateLimit from "express-rate-limit";
import { mongoStore } from "../lib/mongoStore.js";
import { getAppPerDay } from "../controllers/las.stat.controller.js";
const router = express.Router();

const checkJwt = auth({
  audience: "https://thesaharafrontend.vercel.app",
  issuerBaseURL: `https://dev-6kabvi5hppsjvmzk.us.auth0.com/`,
});

const hourlyLimit = rateLimit({
  store: mongoStore("hourlyLimit", 60 * 60 * 1000),
  windowMs: 60 * 60 * 1000,
  max: 300,
  keyGenerator: (req, res) => {
    // Get the most accurate IP address possible
    const forwardedFor = req.headers["x-forwarded-for"];
    const realIP = req.headers["x-real-ip"];
    const clientIP = req.headers["cf-connecting-ip"]; // Cloudflare
    const requestIP = req.ip;
    const socketIP = req.socket?.remoteAddress;

    let ip = "unknown";

    if (forwardedFor) {
      // X-Forwarded-For can contain multiple IPs, get the first one
      ip = forwardedFor.split(",")[0]?.trim();
    } else if (realIP) {
      ip = realIP;
    } else if (clientIP) {
      ip = clientIP;
    } else if (requestIP) {
      ip = requestIP;
    } else if (socketIP) {
      ip = socketIP;
    }

    if (ip === "::1" || ip === "::ffff:127.0.0.1") {
      ip = "127.0.0.1";
    }
    const key = ip;
    return `${key}_freeUserDaily`;
  },

  message: {
    success: false,
    message: "You have reached the hourly limit of 300 requests.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/upsert", hourlyLimit, checkJwt, upsertLAS);
router.post("/getApplicant", hourlyLimit, checkJwt, getApplicant);
router.post("/getLmsin", hourlyLimit, checkJwt, getLMSIN);
router.post("/getRecentHistory", hourlyLimit, checkJwt, getRecentHistory);
router.post("/getOfficers", hourlyLimit, checkJwt, getOfficers);
router.post("/getBranch", hourlyLimit, checkJwt, getBranch);
router.post("/getAllBranchSlugs", hourlyLimit, checkJwt, getAllBranchSlugs);
router.post("/getAppPerDay", hourlyLimit, checkJwt, getAppPerDay);

// admin
router.post("/addOfficer", hourlyLimit, checkJwt, addOfficer);
router.post("/removeOfficer", hourlyLimit, checkJwt, removeOfficer);
router.post("/transferEmployee", hourlyLimit, checkJwt, transferEmployee);

export default router;
