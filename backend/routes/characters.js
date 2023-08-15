const express = require("express");
const router = express.Router();
const {
  getCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} = require("../controllers/characterControllers.js");

router.get("/", getCharacters);

router.get("/:id", getCharacter);

router.post("/", createCharacter);

router.delete("/:id", deleteCharacter);

router.patch("/:id", updateCharacter);

module.exports = router;
