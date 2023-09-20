import express from "express";
const router = express.Router();
import {
  getCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} from "../controllers/characterControllers.js";

router.get("/", getCharacters);

router.get("/:id", getCharacter);

router.post("/", createCharacter);

router.delete("/:id", deleteCharacter);

router.patch("/:id", updateCharacter);

export default router;
