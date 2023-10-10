import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

profileSchema.statics.signup = async function (
  name,
  username,
  email,
  password
) {
  if (!username || !email || !password) {
    throw Error("Fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password not strong enough");
  // }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email in use.");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const profile = await this.create({
      name,
      username,
      email,
      password: hash,
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

profileSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fields must be filled");
  }
  const profile = await this.findOne({ email });
  if (!profile) {
    throw Error("No email found.");
  }
  const match = await bcrypt.compare(password, profile.password);
  if (!match) {
    throw Error("Incorrect password.");
  }
  return profile;
};

export default mongoose.model("Profile", profileSchema);
