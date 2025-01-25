import { Router } from "express";
import apiRoutes from "./api/index";
<<<<<<< HEAD
import { authenticateToken } from "../auth/auth";

const router = Router();

router.use(
  "/api",
  // authenticateToken,
  apiRoutes
);
=======
// import { authenticateToken } from "../utils/auth";

const router = Router();

router.use("/api",
    // authenticateToken,
    apiRoutes);
>>>>>>> da3f85ac737c8576dd1e52ebb50e12e41092f604

export default router;
