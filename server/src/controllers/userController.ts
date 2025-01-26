import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  userIdSchema,
  userEmailSchema,
  userPasswordSchema,
} from "../schema/userSchema";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (users.length === 0) {
      console.error("No users found.");
      res.status(404).json({ message: "No users found." });
      return;
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parsedId = userIdSchema.safeParse(id);
    if (!parsedId.success) {
      console.error(parsedId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedId.data },
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      console.error("User not found.");
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const parsedEmail = userEmailSchema.safeParse(email);

    if (!parsedEmail.success) {
      console.error(parsedEmail.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: parsedEmail.data },
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      console.error("User not found.");
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const parsedEmail = userEmailSchema.safeParse(email);
    const parsedPassword = userPasswordSchema.safeParse(password);

    if (!parsedEmail.success) {
      console.error(parsedEmail.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    if (!parsedPassword.success) {
      console.error(parsedPassword.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedPassword.data, saltRounds);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedEmail.data },
    });

    if (existingUser) {
      console.error("A user with this email already exists.");
      res
        .status(400)
        .json({ message: "A user with this email already exists." });
      return;
    }

    const newUser = await prisma.user.create({
      data: { email: parsedEmail.data, password: hashedPassword },
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const parsedId = userIdSchema.safeParse(id);
    const parsedEmail = userEmailSchema.safeParse(email);

    if (!parsedId.success) {
      console.error(parsedId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    if (!parsedEmail.success) {
      console.error(parsedEmail.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.error("User not found.");
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user.email === parsedEmail.data) {
      console.error("Provided email is already user's current email.");
      res
        .status(400)
        .json({ message: "Provided email is already user's current email." });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser?.email === parsedEmail.data) {
      res.status(403).json({ message: "Provided email is already in use." });
      return;
    }

    const updateData: any = {};
    if (parsedEmail.data) updateData.email = parsedEmail.data;

    const updatedUser = await prisma.user.update({
      where: { id: parsedId.data },
      data: updateData,
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parsedId = userIdSchema.safeParse(id);

    if (!parsedId.success) {
      console.error(parsedId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedId.data },
    });

    if (!user) {
      console.error("User not found.");
      res.status(404).json({ message: "User not found." });
      return;
    }

    await prisma.user.delete({
      where: { id: parsedId.data },
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
