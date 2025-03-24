import { v2 as cloudinary } from 'cloudinary';

export const UploadImage= async (file,folder,quality,height)=>{

    const options={folder, allowed_formats: ["jpg", "png", "gif", "bmp", "webp", "tiff", "svg", "heic","mp4"]}
    if(quality){
        options.quality=quality
    }
    if(height){
        options.height=height
    }

   try{
    return await cloudinary.uploader.upload(file.tempFilePath,options)
   }catch(err){
    return res.status(500).json({success:false,msg:"Sever Down while uploading the File to Cloud"})
   }

}