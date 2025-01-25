import express from "express";
import {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/userController";

const router = express.Router();

// GET ALL USERS
router.get("/", getUsers);

// GET USER BY ID
router.get("/id/:id", getUserById);

// GET USER BY EMAIL
router.get("/email/:email", getUserByEmail);

// CREATE USER
router.post("/", createUser);

// UPDATE USER
router.put("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

export { router as userRouter };
