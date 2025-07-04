import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { authSchema } from "../schema/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY!;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authorization header required." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const userId = jwt.verify(token, secretKey) as string;
    req.userId = userId;

    next();
  } catch (error) {
    console.error("Error authenticating JWT access token:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const signup = async (req: Request, res: Response) => {
  const parsedReq = authSchema.safeParse(req.body);
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
      res.status(403).json({ message: "User with this email already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: { email: data.email, password: hashedPassword },
      select: {
        id: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const token = jwt.sign(newUser.id, secretKey, { expiresIn: "7d" });

    res.status(201).json(token);
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsedReq = authSchema.safeParse(req.body);
  if (!parsedReq.success) {
    console.error("Request parsing error:", parsedReq.error);
    res.status(400).json({ message: "Request Parsing Error" });
    return;
  }

  const { data } = parsedReq;

  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const passwordIsValid = await bcrypt.compare(data.password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(user.id, secretKey, { expiresIn: "7d" });

    res.status(201).json(token);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
