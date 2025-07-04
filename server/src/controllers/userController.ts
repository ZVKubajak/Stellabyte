import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  emailSchema,
  createUserSchema,
  updateUserSchema,
} from "../schema/userSchema";
import idSchema from "../schema/idSchema";
import deleteFolder from "../utils/deleteFolder";
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
      res.status(404).json({ message: "No users found." });
      return;
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    console.error("Error parsing request:", parsedId.error);
    res.status(404).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: data },
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const parsedEmail = emailSchema.safeParse(req.params.email);
  if (!parsedEmail.success) {
    console.error("Error parsing request:", parsedEmail.error);
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedEmail;

  try {
    const user = await prisma.user.findUnique({
      where: { email: data },
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const parsedReq = createUserSchema.safeParse(req.body);
  if (!parsedReq.success) {
    console.error("Request parsing error:", parsedReq.error);
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedReq;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const newUser = await prisma.user.create({
      data: { email: data.email, password: hashedPassword },
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  if (!req.auth) {
    res.status(400).json({ message: "Missing auth token ID." });
    return;
  }

  const { userId } = req.auth;

  const parsedReq = updateUserSchema.safeParse(req.body);
  if (!parsedReq.success) {
    console.error("Error parsing request:", parsedReq.error);
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedReq;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists." });
      return;
    }

    const passwordIsValid = await bcrypt.compare(data.password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email: !!data.email ? data.email : user.email },
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success) {
    console.error("Error parsing request:", parsedId.error);
    res.status(404).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedId;

  try {
    const user = await prisma.user.findUnique({ where: { id: data } });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    await deleteFolder(data);
    await prisma.file.deleteMany({ where: { userId: data } });
    await prisma.user.delete({ where: { id: data } });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
