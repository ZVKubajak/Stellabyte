import { Router } from "express";
import apiRoutes from "./api/index";
import { authenticateToken } from "../utils/auth";

const router = Router();

router.use("/api", authenticateToken, apiRoutes);

export default router;
