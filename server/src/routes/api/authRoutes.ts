import express from "express";
import { signUp } from "../../auth/auth";

const router = express.Router();

router.post("/signup", signUp);

export { router as authRouter };
