import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { fileIdSchema, fileUserIdSchema } from "../schema/fileSchema";
import AWS from "../config/awsConfig";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME!;

export const getAllFiles = async (_req: Request, res: any) => {
  try {
    const files = await prisma.file.findMany({
      select: {
        id: true,
        userId: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        s3Url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (files.length === 0) {
      console.error("No files found.");
      return res.sendStatus(404);
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

export const getUserFiles = async (req: Request, res: any) => {
  const { userId } = req.params;

  try {
    const parsedUserId = fileUserIdSchema.safeParse(userId);
    if (!parsedUserId.success) {
      console.error(parsedUserId.error);
      return res.sendStatus(400);
    }

    const files = await prisma.file.findMany({
      where: { userId: parsedUserId.data },
      select: {
        id: true,
        userId: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        s3Url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (files.length === 0) {
      console.error("No files found for this user.");
      return res.sendStatus(404);
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

export const getFileById = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const parsedId = fileIdSchema.safeParse(id);
    if (!parsedId.success) {
      console.error(parsedId.error);
      return res.sendStatus(400);
    }

    const file = await prisma.file.findUnique({
      where: { id: parsedId.data },
      select: {
        id: true,
        userId: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        s3Url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!file) {
      console.error("File not found.");
      return res.sendStatus(404);
    } else {
      res.status(200).json({ message: "File found.", file });
    }
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const uploadFile = async (req: Request, res: any) => {
  const { userId } = req.body;

  try {
    const parsedUserId = fileUserIdSchema.safeParse(userId);
    if (!parsedUserId.success) {
      console.error(parsedUserId.error);
      return res.sendStatus(400);
    }

    if (!req.file) {
      console.error("No file uploaded.");
      return res.sendStatus(400);
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId.data },
    });

    if (!user) {
      console.error("User by given userId not found.");
      return res.sendStatus(404);
    }

    const bucketParams = {
      Bucket: bucket,
      Key: `${parsedUserId.data}/${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const data = await s3.upload(bucketParams).promise();

    const newFile = await prisma.file.create({
      data: {
        userId: parsedUserId.data,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        s3Url: data.Location,
      },
      select: {
        id: true,
        userId: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        s3Url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({ message: "File uploaded successfully.", newFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const removeFile = async (req: Request, res: any) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const parsedId = fileIdSchema.safeParse(id);
    const parsedUserId = fileUserIdSchema.safeParse(userId);
    if (!parsedId.success) {
      console.error(parsedId.error);
      return res.sendStatus(400);
    } else if (!parsedUserId.success) {
      console.error(parsedUserId.error);
      return res.sendStatus(400);
    }

    const file = await prisma.file.findUnique({
      where: { id: parsedId.data },
      select: {
        id: true,
        userId: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        s3Url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!file) {
      console.error("File not found.");
      return res.sendStatus(404);
    }

    const bucketParams = {
      Bucket: bucket,
      Key: `${parsedUserId.data}/${file.fileName}`,
    };

    await s3.deleteObject(bucketParams).promise();
    await prisma.file.delete({
      where: { id: parsedId.data },
    });

    res.status(200).json({ message: "File removed successfully." });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
