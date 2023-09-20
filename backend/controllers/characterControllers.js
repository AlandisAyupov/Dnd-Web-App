import Character from "../models/characterModel.js";
import mongoose from "mongoose";

const getCharacters = async (req, res) => {
  const characters = await Character.find({});
  res.status(200).json(characters);
};

const getCharacter = async (req, res) => {
  const { id } = req.params;
  const character = await Character.findById(id);
  if (!character) {
    res.status(404).json({ error: "No such character." });
  }
  res.status(200).json(character);
};

const createCharacter = async (req, res) => {
  console.log("req.file", req.file);
  const { name, charClass, level, alignment } = req.body;

  let emptyFields = [];
  if (!name) emptyFields.push("name");
  if (!charClass) emptyFields.push("charClass");
  if (!level) emptyFields.push("level");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const character = await Character.create({
      name,
      charClass,
      level,
      alignment,
    });
    res.status(200).json(character);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such character" });
  }
  const character = await Character.findOneAndDelete({ _id: id });
  if (!character) {
    res.status(404).json({ error: "No such character." });
  }
  res.status(200).json(character);
};

const updateCharacter = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such character" });
  }
  const character = await Character.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!character) {
    res.status(404).json({ error: "No such character." });
  }
  res.status(200).json(character);
};

export {
  getCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacter,
};
