import express from "express";
import { signUp, login } from "../../auth/auth";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

export { router as authRouter };
