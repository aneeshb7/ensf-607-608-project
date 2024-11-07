import express from "express";
import { register, login } from "../controllers/authentication.js";

const router = express.Router();

//Register user
router.post("/register", register);

router.get("/", (req, res) => {
    return res.status(200).json({ message: "Success" });
})

//Log in
router.post("/login", login);

export default router;