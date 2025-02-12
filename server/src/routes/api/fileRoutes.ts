import express from "express";
import upload from "../../config/upload";
import {
  getAllFiles,
  getUserFiles,
  getFileById,
  uploadFile,
  downloadFile,
  removeFile,
} from "../../controllers/fileController";

const router = express.Router();

router.get("/", getAllFiles);
router.get("/user/:id", getUserFiles);
router.get("/id/:id", getFileById);
router.post("/", upload.single("file"), uploadFile);
router.get("/download", downloadFile);
router.delete("/:id", removeFile);

export { router as fileRouter };
