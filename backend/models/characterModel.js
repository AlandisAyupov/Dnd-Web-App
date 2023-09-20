import mongoose from "mongoose";

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

export default mongoose.model("Character", characterSchema);
