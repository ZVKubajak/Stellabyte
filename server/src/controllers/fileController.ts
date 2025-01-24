import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import AWS from "../config/awsConfig";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME!;

export const getAllFiles = async (_req: Request, res: Response) => {
  try {
    const files = await prisma.file.findMany({
      select: {
        id: true,
        userId: false,
        fileName: true,
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
        fileName: true,
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
        fileName: true,
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

export const createFile = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const bucketParams = {
      Bucket: bucket,
      Key: `${userId}/${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const data = await s3.upload(bucketParams).promise();

    const newFile = await prisma.file.create({
      data: {
        userId,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        s3Url: data.Location,
      },
      select: {
        id: true,
        userId: false,
        fileName: true,
        fileType: true,
        fileSize: true,
        s3Url: true,
      },
    });

    res.status(201).json({ message: "File created successfully.", newFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
