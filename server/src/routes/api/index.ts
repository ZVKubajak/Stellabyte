import { Router } from "express";
import { userRouter } from "./userRoutes";
import { fileRouter } from "./fileRoutes";
import { authRouter } from "./authRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/files", fileRouter);
router.use("/auth", authRouter);

export default router;
