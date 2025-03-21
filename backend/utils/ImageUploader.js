import { v2 as cloudinary } from 'cloudinary';

export const UploadImage= async (file,folder,quality,height)=>{

    const options={folder}
    if(quality){
        options.quality=quality
    }
    if(height){
        options.height=height
    }

    return await cloudinary.uploader.upload(file.tempFilePath,options)
}