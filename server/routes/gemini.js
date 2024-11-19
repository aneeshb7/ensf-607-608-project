import express from "express";
import { generateResponse, generateBudget } from "../controllers/gemini.js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

// Prompt gemini
router.post("/generate", generateResponse);

// Generate budget
router.post("/generateBudget", generateBudget);

export default router;