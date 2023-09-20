import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model("Profile", profileSchema);
