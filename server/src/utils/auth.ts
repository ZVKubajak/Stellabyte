import { Request, Response, NextFunction } from "express";
import { userEmailSchema, userPasswordSchema } from "../schema/userSchema";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// New Approach: Interface For Request.

interface JwtPayload {
  id: string;
  email: string;
}

// interface AuthenticatedRequest extends Request {
//   user: JwtPayload;
// }

const secretKey = process.env.JWT_SECRET_KEY || "";

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        console.error("Error verifying token", err);
        return res
          .status(403)
          .json({ status: "Forbidden", message: "Invalid or expired token." });
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.status(401).json({
      status: "Unauthorized",
      message: "Authorization header is missing.",
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const parsedEmail = userEmailSchema.safeParse(email);
    const parsedPassword = userPasswordSchema.safeParse(password);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedEmail.data }
    })

    if (existingUser) {
      return res.status(400).json({ message: "Error occurred. Please try again later." })
    }

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

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedEmail.data },
    });

    if (existingUser) {
      console.error("User with this email already exists.");
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedPassword.data, 10);

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

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      secretKey,
      { expiresIn: "7d" }
    );

    res.status(201).json(token);
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const parsedEmail = userEmailSchema.safeParse(email);
    const parsedPassword = userPasswordSchema.safeParse(password);

    if (!parsedEmail.success) {
      console.error(parsedEmail.error);
      res.status(400).json({ message: "Controller Parsing Error" });
    }

    const user = await prisma.user.findUnique({
      where: { email: parsedEmail.data },
    });

    if (!user) {
      console.error("User does not exist.");
      res.status(401).json({ message: "Authentication Failed" });
      return;
    }

    if (!parsedPassword.success) {
      console.error(parsedPassword.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    const passwordIsValid = await bcrypt.compare(
      parsedPassword.data,
      user.password
    );

    if (!passwordIsValid) {
      console.error("Passwords do not match.");
      res.status(401).json({ message: "Authentication Failed" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "7d",
    });

    res.status(201).json(token);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
