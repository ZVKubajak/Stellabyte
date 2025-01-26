import { Request, Response, NextFunction } from "express";
import { userEmailSchema, userPasswordSchema } from "../schema/userSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

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

export const signUp = async (req: Request, res: any) => {
  const { email, password } = req.body;

  try {
    const parsedEmail = userEmailSchema.safeParse(email);
    const parsedPassword = userPasswordSchema.safeParse(password);

    if (!parsedEmail.success) {
      return res.status(400).json({ message: "Invalid email.", parsedEmail });
    } else if (!parsedPassword.success) {
      return res
        .status(400)
        .json({ message: "Invalid password.", parsedPassword });
    }

    const newUser = await prisma.user.create({
      data: {email: parsedEmail.data, password: parsedPassword.data},
      select: {
        id: true,
        email: true,
        myFiles: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      secretKey,
      { expiresIn: "7d" }
    );

    return res
      .status(201)
      .json({ message: "User created and signed in.", token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const login = async (req: Request, res: any) => {
  // const { email, password } = req.body;

  // const user = await User.findOne({
  //   where: { email },
  // });
  // if (!user) {
  //   return res.status(401).json({ message: 'Authentication failed' });
  // }

  // const passwordIsValid = await bcrypt.compare(password, user.password);
  // if (!passwordIsValid) {
  //   return res.status(401).json({ message: 'Authentication failed' });
  // }

  // const secretKey = process.env.JWT_SECRET_KEY || '';

  // const token = jwt.sign({ id: user.id, email }, secretKey, { expiresIn: '7d' });
  // return res.json({ token });
};