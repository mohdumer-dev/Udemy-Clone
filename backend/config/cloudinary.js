import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

export const ConnectToCloudinary =async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected")
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
};