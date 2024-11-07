import express from "express";
import {
    createAccount,
    getAccount,
    getAllAccounts,
    updateAccount,
    deleteAccount
} from "../controllers/account.js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

// Create account
router.post("/", verifyToken, createAccount);

// Get account by ID
router.get("/:id", verifyToken, getAccount);

// Get all accounts for the authenticated user
router.get("/", verifyToken, getAllAccounts);

// Update account
router.put("/:id", verifyToken, updateAccount);

// Delete account
router.delete("/:id", verifyToken, deleteAccount);

export default router;
