import { Request, Response, NextFunction } from "express";
import { userEmailSchema, userPasswordSchema } from "../schema/userSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    const parsedEmail = userEmailSchema.safeParse({ email });
    const parsedPassword = userPasswordSchema.safeParse({ password });

    if (!parsedEmail.success) {
      return res.status(400).json({ message: "Invalid email.", parsedEmail });
    } else if (!parsedPassword.success) {
      return res
        .status(400)
        .json({ message: "Invalid password.", parsedPassword });
    }

    const response = await fetch(`http://localhost:3001/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsedEmail.data,
        password: parsedPassword.data,
      }),
    });

    if (!response.ok) {
      return res
        .status(400)
        .json({ message: "Unable to create user.", response });
    }

    const data = await response.json();

    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
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
  const { email, password } = req.body;
  try {
    const parsedEmail = userEmailSchema.safeParse({ email });
    const parsedPassword = userPasswordSchema.safeParse({ password });

    if (!parsedEmail.success) {
      return res.status(400).json({ message: "Invalid email.", parsedEmail });
    } else if (!parsedPassword.success) {
      return res
        .status(400)
        .json({ message: "Invalid password.", parsedPassword });
    }

    const response = await fetch(
      `http://localhost:3001/api/users/email/${parsedEmail.data}`
    );

    if (!response.ok) {
      return res.status(404).json({ message: "User not found." });
    }

    const data = await response.json();

    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
      secretKey,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ message: "User logged in.", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
