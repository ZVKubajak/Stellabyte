import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import {
  createUserSchemaEmail,
  createUserSchemaPassword,
  updateUserSchema,
} from "../schema/userSchema";

const prisma = new PrismaClient();
const saltRounds = 10;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: any) => {
  const { email, password } = req.body;
  const parsedEmail = createUserSchemaEmail.safeParse({ email });
  const parsedPassword = createUserSchemaPassword.safeParse({ password });

  if (!parsedEmail.success) {
    return res
      .status(500)
      .json({ message: "Error when converting email to zod." });
  }

  if (!parsedPassword.success) {
    return res
      .status(500)
      .json({ message: "Error when converting password to zod." });
  }

  try {
    const hashedPassword = await bcrypt.hash(
      parsedPassword.data.password,
      saltRounds
    );

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedEmail.data.email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user already exists under this email." });
    }

    const user = await prisma.user.create({
      data: { email: parsedEmail.data?.email, password: hashedPassword },
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).json({ message: "User created successfully: ", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: any) => {
  const { id } = req.params;
  const { email } = req.body;
  const parsedEmail = updateUserSchema.safeParse({ email });

  if (!parsedEmail.success) {
    return res
      .status(500)
      .json({ message: "Error when converting email to zod." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser?.email === parsedEmail.data.email) {
      return res
        .status(500)
        .json({ message: "An error occured, please try again later." });
    }

    if (user?.email === parsedEmail.data.email) {
      return res
        .status(500)
        .json({
          message: "You can not change your current email to your new one.",
        });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found with this ID." });
    }
    const updateData: any = {};
    if (parsedEmail.data?.email) updateData.email = parsedEmail.data.email;

    const updatedUser = await prisma.user.update({
      where: { id },
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
      .json({ message: "Updated user successfully: ", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: any) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "No user found with this ID." });
    }
    await prisma.user.delete({
      where: { id },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
