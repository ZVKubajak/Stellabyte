import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import s3Client from "../config/awsConfig";
import idSchema from "../schema/idSchema";

const prisma = new PrismaClient();
const bucket = process.env.BUCKET_NAME!;

export const getAllFiles = async (_req: Request, res: Response) => {
  try {
    const files = await prisma.file.findMany();
    if (files.length === 0) {
      res.status(404).json({ message: "No files found." });
      return;
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching all files:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserFiles = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.userId);
  if (!parsedId.success) {
    res.status(400).json({ message: "No ID provided." });
    return;
  }

  const { data } = parsedId;

  try {
    const files = await prisma.file.findMany({ where: { userId: data } });
    if (files.length === 0) {
      res.status(200).json({ message: "No files found under this user." });
      return;
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files by user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.userId);
  if (!parsedId.success) {
    res.status(400).json({ message: "No ID provided." });
    return;
  }

  const { data } = parsedId;

  try {
    const file = await prisma.file.findUnique({ where: { id: data } });
    if (!file) {
      res.status(404).json({ message: "File not found." });
      return;
    }

    res.status(200).json(file);
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const uploadFile = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.body.userId);
  if (!parsedId.success) {
    res.status(400).json({ message: "No ID provided." });
    return;
  }

  if (!req.file) {
    res.status(400).json({ message: "No file uploaded." });
    return;
  }

  const { data } = parsedId;

  try {
    const user = await prisma.user.findUnique({ where: { id: data } });
    if (!user) {
      res.status(404).json({ message: "User by given userId not found." });
      return;
    }

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: `${data}/${req.file.originalname}`,
      ContentType: req.file.mimetype,
      Body: req.file.buffer,
      ACL: "public-read",
    });

    await s3Client.send(command);

    const newFile = await prisma.file.create({
      data: {
        userId: data,
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
        s3Url: `https://${bucket}.s3.amazonaws.com/${data}/${req.file.originalname}`,
      },
    });

    res.status(201).json(newFile);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  const parsedUserId = idSchema.safeParse(req.query.userId);
  if (!parsedId.success || !parsedUserId.success) {
    console.error("Error parsing request:", parsedId.error, parsedUserId.error);
    res.status(400).json({ message: "File and/or user ID not provided." });
    return;
  }

  const { data: fileId } = parsedId;
  const { data: userId } = parsedUserId;

  try {
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      res.status(404).json({ message: "File not found." });
      return;
    }

    if (file.userId !== userId) {
      res.status(403).json({ message: "Unauthorized file access." });
      return;
    }

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: `${userId}/${file.type}`,
    });

    const { Body, ContentType, ContentLength } = await s3Client.send(command);

    if (!Body) throw new Error("Invalid file stream.");

    res.setHeader("Content-Type", ContentType || "application/octet-stream");
    res.setHeader("Content-Length", ContentLength || "0");
    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);

    const stream = Body as NodeJS.ReadableStream;
    stream.pipe(res);

    stream.on("error", (error) => {
      console.error("Stream Error:", error);
      if (!res.headersSent) throw new Error("Error streaming file.");
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFile = async (req: Request, res: Response) => {
  const parsedId = idSchema.safeParse(req.params.id);
  const parsedUserId = idSchema.safeParse(req.query.userId);
  if (!parsedId.success || !parsedUserId.success) {
    console.error("Error parsing request:", parsedId.error, parsedUserId.error);
    res.status(400).json({ message: "File and/or user ID not provided." });
    return;
  }

  const { data: fileId } = parsedId;
  const { data: userId } = parsedUserId;

  try {
    const file = await prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      res.status(404).json({ message: "File not found." });
      return;
    }

    if (file.userId !== userId) {
      res.status(403).json({ message: "Unauthorized file access." });
      return;
    }

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: `${parsedUserId.data}/${file.name}`,
    });

    await s3Client.send(command);
    await prisma.file.delete({ where: { id: fileId } });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
