import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import AWS from "../config/awsConfig";

const prisma = new PrismaClient();

export const getAllFiles = async (_req: Request, res: Response) => {
  try {
    const files = await prisma.file.findMany({
      select: {
        id: true,
        userId: false,
        fileType: true,
        fileSize: true,
        s3Url: false,
      },
    });

    if (files.length === 0) {
      res.status(404).json({ message: "No files found." });
    } else {
      res
        .status(200)
        .json({ message: `${files.length} file(s) found.`, files });
    }
  } catch (error) {
    console.error("Error fetching all files:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUserFiles = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const files = await prisma.file.findMany({
      where: { userId: id },
      select: {
        id: true,
        userId: false,
        fileType: true,
        fileSize: true,
        s3Url: true,
      },
    });

    if (files.length === 0) {
      res.status(404).json({ message: "No files found for this user." });
    } else {
      res.status(200).json({
        message: `${files.length} file(s) found for this user.`,
        files,
      });
    }
  } catch (error) {
    console.error("Error fetching files by user:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const file = await prisma.file.findUnique({
      where: { id },
      select: {
        id: true,
        userId: false,
        fileType: true,
        fileSize: true,
        s3Url: true,
      },
    });

    if (!file) {
      res.status(404).json({ message: "File not found." });
    } else {
      res.status(200).json({ message: "File found.", file });
    }
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
