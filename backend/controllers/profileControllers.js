import Profile from "../models/profileModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
import sharp from "sharp";
import jwt from "jsonwebtoken";
dotenv.config();
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
});

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const getProfiles = async (req, res) => {
  const profiles = await Profile.find({});
  for (const profile of profiles) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: profile.name,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    profile.url = url;
  }
  res.send(profiles);
};

const getProfile = async (req, res) => {};

const createProfile = async (req, res) => {
  const imgName = randomName();
  try {
    if (req.file.buffer !== void 0) {
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 500, width: 500, fit: "contain" })
        .toBuffer();
      const params = {
        Bucket: bucketName,
        Key: imgName,
        Body: buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const profile = await Profile.signup(
      imgName,
      req.body.username,
      req.body.email,
      req.body.password
    );
    const token = createToken(profile._id);
    res.status(200).json({ profile, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such profile" });
  }
  if (!profile) {
    res.status(404).json({ error: "No such profile." });
  }
  const params = {
    Bucket: bucketName,
    Key: profile.name,
  };
  const command = DeleteObjectCommand(params);
  await s3.send(command);
  await Profile.findOneAndDelete({ _id: id });
  res.status(200).json(profile);
};

const updateProfile = async (req, res) => {};

const loginProfile = async (req, res) => {
  const { password, email } = req.body;
  try {
    const profile = await Profile.login(email, password);
    const token = createToken(profile._id);
    res.status(200).json({ profile, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
  loginProfile,
};
