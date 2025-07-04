import { Router } from "express";
import {
  getAllFiles,
  getUserFiles,
  getFileById,
  uploadFile,
  downloadFile,
  removeFile,
} from "../../controllers/fileController";
import upload from "../../config/upload";

const router = Router();

// Get all file entries.
router.get("/", getAllFiles);

// Get all file entries that belong to a user.
router.get("/user/:id", getUserFiles);

// Get a file entry by its ID.
router.get("/id/:id", getFileById);

// Upload a file up to 50MB in size to AWS S3.
router.post("/", upload.single("file"), uploadFile);

// Download a file stored on AWS S3.
router.get("/download/:id", downloadFile);

// Remove a file stored on AWS S3.
router.delete("/:id", removeFile);

export { router as fileRouter };
