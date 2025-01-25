import express from "express";
import upload from "../../config/upload";
import {
  getAllFiles,
  getUserFiles,
  getFileById,
  uploadFile,
  removeFile,
} from "../../controllers/fileController";

const router = express.Router();

router.get("/", getAllFiles);
router.get("/user/:id", getUserFiles);
router.get("/id/:id", getFileById);
router.post("/:id", upload.single("file"), uploadFile);
router.delete("/:id", removeFile);

export { router as fileRouter };
