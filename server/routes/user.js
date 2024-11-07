import express from "express";
import {
    getUser,
    deleteUser,
    updateUser,
} from "../controllers/user.js"
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

//Get user
router.get("/:id", verifyToken, getUser);

//Update user 
router.put("/:id", verifyToken, updateUser)

//Delete user
router.delete("/:id", verifyToken, deleteUser)

export default router;