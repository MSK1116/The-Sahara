import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { getApplicant, getBranch, getLMSIN, getOfficers, getRecentHistory, upsertLAS } from "../controllers/las.controller.js";
const router = express.Router();

const checkJwt = auth({
  audience: "https://thesaharafrontend.vercel.app",
  issuerBaseURL: `https://dev-6kabvi5hppsjvmzk.us.auth0.com/`,
});

router.post("/upsert", checkJwt, upsertLAS);
router.post("/getApplicant", checkJwt, getApplicant);
router.post("/getLmsin", checkJwt, getLMSIN);
router.post("/getRecentHistory", checkJwt, getRecentHistory);
router.post("/getOfficers", checkJwt, getOfficers);
router.post("/getBranch", checkJwt, getBranch);

export default router;
