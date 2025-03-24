import { v2 as cloudinary } from "cloudinary";

export const UploadVideo = async (video, folder, quality, height) => {
  const options = { folder, format: "mp4", resource_type: "video" };
  if (quality) {
    options.quality = quality;
  }
  if (height) {
    options.height = height;
  }

  return await cloudinary.uploader.upload(video.tempFilePath, options);
};
