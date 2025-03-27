export const ImageValidation = (imageType) => {
 const SupportedExtenstion=["jpg", "png", "gif", "bmp", "webp", "tiff", "svg", "heic","jpeg"]
  if (!SupportedExtenstion.includes(imageType)) {
    return { success: false, msg: "File Type Not Supported" };
  }
};
2