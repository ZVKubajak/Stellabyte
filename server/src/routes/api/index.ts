import { Router } from "express";
import { userRouter } from "./userRoutes";
import { fileRouter } from "./fileRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/files", fileRouter);

export default router;
