import express from "express";
import {
    createGoal,
    getGoal,
    getAllGoals,
    updateGoal,
    deleteGoal
} from "../controllers/goal.js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

// Create goal
router.post("/", verifyToken, createGoal);

// Get goal by ID
router.get("/:id", verifyToken, getGoal);

// Get all goals for the authenticated user
router.get("/", verifyToken, getAllGoals);

// Update goal
router.put("/:id", verifyToken, updateGoal);

// Delete goal
router.delete("/:id", verifyToken, deleteGoal);

export default router;
