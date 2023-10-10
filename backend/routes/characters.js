import express from "express";
import {
  getCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} from "../controllers/characterControllers.js";
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();
router.use(requireAuth);

router.get("/", getCharacters);

router.get("/:id", getCharacter);

router.post("/", createCharacter);

router.delete("/:id", deleteCharacter);

router.patch("/:id", updateCharacter);

export default router;
