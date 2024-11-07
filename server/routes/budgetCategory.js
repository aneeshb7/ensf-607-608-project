import express from "express";
import {
    createBudgetCategory,
    getAllBudgetCategories,
    getBudgetCategoryById,
    updateBudgetCategory,
    deleteBudgetCategory
} from "../controllers/budgetCategory.js"; // Import controller functions
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

// Create a new budget category
router.post("/", verifyToken, createBudgetCategory);

// Get all budget categories
router.get("/", verifyToken, getAllBudgetCategories);

// Get a single budget category by ID
router.get("/:id", verifyToken, getBudgetCategoryById);

// Update a budget category by ID
router.put("/:id", verifyToken, updateBudgetCategory);

// Delete a budget category by ID
router.delete("/:id", verifyToken, deleteBudgetCategory);

export default router;
