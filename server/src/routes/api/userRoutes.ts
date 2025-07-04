import { Router } from "express";
import {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/userController";

const router = Router();

// Get all user entries.
router.get("/", getUsers);

// GET a user entry by ID.
router.get("/id/:id", getUserById);

// Get a user entry by its email.
router.get("/email/:email", getUserByEmail);

// Create a user entry.
router.post("/", createUser);

// Update a user entry.
router.put("/:id", updateUser);

// Delete a user entry.
router.delete("/:id", deleteUser);

export { router as userRouter };
