import express from "express";
import { register, login } from "../controllers/authentication.js";

const router = express.Router();

//Register user
router.post("/register", register);

//Log in
router.post("/login", login);

export default router;