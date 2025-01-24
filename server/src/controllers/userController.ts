import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                myFiles: true
            }
        });

        res.status(200).json(users);
    } catch (error) {   
        res.status(500).json({ message: "Internal server error" });
    }
};