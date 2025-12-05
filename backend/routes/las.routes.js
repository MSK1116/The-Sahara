import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { addOfficer, getAllBranchSlugs, getApplicant, getBranch, getLMSIN, getOfficers, getRecentHistory, removeOfficer, transferEmployee, upsertLAS } from "../controllers/las.controller.js";
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
router.post("/getAllBranchSlugs", checkJwt, getAllBranchSlugs);
router.post("/addOfficer", addOfficer);
router.post("/removeOfficer", removeOfficer);
router.post("/transferEmployee", transferEmployee);

export default router;
