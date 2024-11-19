import express from "express";
import {
    createTransaction,
    getTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction
} from "../controllers/transaction.js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

// Create transaction
router.post("/", verifyToken, createTransaction);

// Get transaction by ID
router.get("/:id", verifyToken, getTransaction);

// Get all transactions for the authenticated user
router.get("/user/:id", verifyToken, getAllTransactions);

// Update transaction
router.put("/:id", verifyToken, updateTransaction);

// Delete transaction
router.delete("/:id", verifyToken, deleteTransaction);

export default router;
