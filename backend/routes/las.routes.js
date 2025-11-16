import express from "express";
import { getApplicant, getLMSIN, upsertLAS } from "../controllers/las.controller.js";
const router = express.Router();

router.post("/upsert", upsertLAS);
router.post("/getApplicant", getApplicant);
router.get("/getLmsin", getLMSIN);

export default router;
