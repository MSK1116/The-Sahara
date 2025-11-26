import express from "express";
import { getApplicant, getLMSIN, getRecentHistory, upsertLAS } from "../controllers/las.controller.js";
const router = express.Router();

router.post("/upsert", upsertLAS);
router.post("/getApplicant", getApplicant);
router.post("/getLmsin", getLMSIN);
router.post("/getRecentHistory", getRecentHistory);

export default router;
