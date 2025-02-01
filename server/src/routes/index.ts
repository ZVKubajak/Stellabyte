import { Router } from "express";
import apiRoutes from "./api/index";
import { authRouter } from "./api/authRoutes";
import { authenticateToken } from "../utils/auth";

const router = Router();

router.use("/api", authenticateToken, apiRoutes);
router.use("/auth", authRouter);

export default router;
