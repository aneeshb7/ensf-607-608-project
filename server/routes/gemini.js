import express from "express";
import { generateResponse } from "../controllers/gemini.js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

// Prompt gemini
router.post("/generate", generateResponse);

export default router;