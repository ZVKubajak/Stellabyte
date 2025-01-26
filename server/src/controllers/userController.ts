import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  userIdSchema,
  userEmailSchema,
  userPasswordSchema,
} from "../schema/userSchema";

// User can update email with wrong/any password.

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
      return res.sendStatus(404);
    } else {
      res
        .status(200)
        .json({ message: `${users.length} user(s) found.`, users });
    }
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parsedId = userIdSchema.safeParse(id);
    if (!parsedId.success) {
      console.error(parsedId.error);
      return res.status(400);
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
      return res.sendStatus(404);
    } else {
      res.status(200).json({ message: "User found.", user });
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const parsedEmail = userEmailSchema.safeParse(email);

    if (!parsedEmail.success) {
      console.error(parsedEmail.error);
      return res.sendStatus(400);
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
      return res.sendStatus(404);
    } else {
      res.status(200).json({ message: "User found.", user });
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createUser = async (req: Request, res: any) => {
  const { email, password } = req.body;

  try {
    const parsedEmail = userEmailSchema.safeParse(email);
    const parsedPassword = userPasswordSchema.safeParse(password);

    if (!parsedEmail.success) {
      console.error(parsedEmail.error);
      return res.sendStatus(400);
    }

    if (!parsedPassword.success) {
      console.error(parsedPassword.error);
      return res.sendStatus(400);
    }

    const hashedPassword = await bcrypt.hash(parsedPassword.data, saltRounds);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedEmail.data },
    });

    if (existingUser) {
      console.error("A user with this email already exists.");
      return res.sendStatus(400);
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

    res.status(201).json({ message: "User created successfully.", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateUser = async (req: Request, res: any) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const parsedId = userIdSchema.safeParse(id);
    const parsedEmail = userEmailSchema.safeParse(email);

    if (!parsedId.success) {
      console.error(parsedId.error);
      return res.sendStatus(400);
    }

    if (!parsedEmail.success) {
      console.error(parsedEmail.error);
      return res.sendStatus(400);
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.error("User not found.");
      return res.sendStatus(404);
    }

    if (user.email === parsedEmail.data) {
      console.error("Provided email is already user's current email.");
      return res.sendStatus(400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser?.email === parsedEmail.data) {
      return res.sendStatus(403);
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

    res
      .status(200)
      .json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteUser = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const parsedId = userIdSchema.safeParse(id);

    if (!parsedId.success) {
      console.error(parsedId.error);
      return res.sendStatus(400);
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedId.data },
    });

    if (!user) {
      console.error("User not found.");
      return res.sendStatus(404);
    }

    await prisma.user.delete({
      where: { id: parsedId.data },
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
