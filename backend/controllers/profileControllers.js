import Profile from "../models/profileModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
import sharp from "sharp";
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
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  const imgName = randomName();
  const buffer = await sharp(req.file.buffer)
    .resize({ height: 500, width: 500, fit: "contain" })
    .toBuffer();
  const params = {
    Bucket: bucketName,
    Key: imgName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };
  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.log(error);
  }
  const profile = await Profile.create({
    name: imgName,
  });
  res.status(200).json(profile);
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such character" });
  }
  if (!profile) {
    res.status(404).json({ error: "No such character." });
  }
  const params = {
    Bucket: bucketName,
    Key: profile.name,
  };
  const command = DeleteObjectCommand(params);
  await s3.send(command);
  await Character.findOneAndDelete({ _id: id });
  res.status(200).json(profile);
};

const updateProfile = async (req, res) => {};

export { getProfiles, getProfile, createProfile, deleteProfile, updateProfile };
