const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  charClass: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  alignment: {
    type: String,
  },
});

module.exports = mongoose.model("Character", characterSchema);
