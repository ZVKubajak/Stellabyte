import { Router } from "express";
import apiRoutes from "./api/index";
import authRoutes from "./authRoutes";
import { authenticateToken } from "../utils/auth";

const router = Router();

router.use("/api", authenticateToken, apiRoutes);
router.use("/auth", authRoutes);

export default router;
