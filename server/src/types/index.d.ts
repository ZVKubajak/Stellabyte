import "express";

export type Auth = {
  userId: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      auth?: Auth;
    }
  }
}
