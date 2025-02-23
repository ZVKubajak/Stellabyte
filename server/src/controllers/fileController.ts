import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { fileIdSchema, fileUserIdSchema } from "../schema/fileSchema";
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
      res.status(404).json({ message: "No files found." });
      return;
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching all files:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserFiles = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const parsedUserId = fileUserIdSchema.safeParse(userId);
    if (!parsedUserId.success) {
      console.error(parsedUserId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
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
      res.status(200).json({ message: "No files found for this user." });
      return;
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files by user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const parsedId = fileIdSchema.safeParse(id);
    if (!parsedId.success) {
      console.error(parsedId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
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
      res.status(404).json({ message: "File not found." });
      return;
    }

    res.status(200).json(file);
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const uploadFile = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const parsedUserId = fileUserIdSchema.safeParse(userId);
    if (!parsedUserId.success) {
      console.error(parsedUserId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    }

    if (!req.file) {
      console.error("No file uploaded.");
      res.status(400).json({ message: "No file uploaded." });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId.data },
    });

    if (!user) {
      console.error("User by given userId not found.");
      res.status(404).json({ message: "User by given userId not found." });
      return;
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

    res.status(201).json(newFile);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;

  try {
    const parsedId = fileIdSchema.safeParse(id);
    const parsedUserId = fileUserIdSchema.safeParse(userId);

    if (!parsedId.success) {
      console.error(parsedId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    } else if (!parsedUserId.success) {
      console.error(parsedUserId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
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
      res.status(404).json({ message: "File not found." });
      return;
    }

    if (file.userId !== parsedUserId.data) {
      console.error("Unauthorized access.");
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const bucketParams = {
      Bucket: bucket,
      Key: `${parsedUserId.data}/${file.fileName}`,
    };

    const fileStream = s3.getObject(bucketParams).createReadStream();
    res.setHeader("Content-Type", file.fileType);

    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const removeFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const parsedId = fileIdSchema.safeParse(id);
    const parsedUserId = fileUserIdSchema.safeParse(userId);

    if (!parsedId.success) {
      console.error(parsedId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
    } else if (!parsedUserId.success) {
      console.error(parsedUserId.error);
      res.status(400).json({ message: "Controller Parsing Error" });
      return;
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
      res.status(404).json({ message: "File not found." });
      return;
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
    res.status(500).json({ message: "Server Error" });
  }
};
