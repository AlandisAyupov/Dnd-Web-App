import express from "express";
const router = express.Router();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
  loginProfile,
} from "../controllers/profileControllers.js";

router.get("/", getProfiles);

router.get("/:id", getProfile);

router.post("/signup", upload.single("image"), createProfile);

router.post("/login", loginProfile);

router.delete("/:id", deleteProfile);

router.patch("/:id", updateProfile);

export default router;
