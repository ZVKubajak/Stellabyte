import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  email: string;
}

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY || "";

    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401);
  }
};