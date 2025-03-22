// create a course

import { CourseModel } from "../models/Course.js";
import { TagModel } from "../models/Tag.js";
import { UserModel } from "../models/User.js";
import { UploadImage } from "../utils/ImageUploader.js";
<<<<<<< HEAD
=======
import { ImageValidation } from "../validators/Imagvalidation.js";
>>>>>>> 33b5c81 (Added Files)

export const createCourse = async (req, res) => {
  try {
    // get the data
<<<<<<< HEAD
=======

>>>>>>> 33b5c81 (Added Files)
    const { title, description, price, whatYouLearn, tag } = req.body;
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !title ||
      !description ||
      !price ||
      !whatYouLearn ||
      !thumbnail ||
      !tag
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }


    // imagevalidation
    const FileType = thumbnail.name.split(".")[1];

    // Call
    const { success, msg } = ImageValidation(FileType);
    if (!success) {
      return res.status(400).json({success:false, msg });
    }

    // get the tag model
    const GetTag = await TagModel.findOne({ name: tag });

    // check the tag
    if (!GetTag) {
      return res.status(400).json({ success: false, msg: "Tag  not found" });
    }

    // upload image to cloudinary and get the url
    const imageUrl = await UploadImage(thumbnail, "Course");

    // get the instructor id from auth middleware
    const instrcutorId = req.id;

    console.log(instrcutorId);
    // create a course
    const CreateCourse = await CourseModel.create({
      title,
      description,
      price,
      whatYouLearn,
      thumbnail: imageUrl.secure_url,
      instructor: instrcutorId,
    });
    // add course id to the instructor course array
    await UserModel.findOneAndUpdate(
      { _id: instrcutorId },
      { $push: { courses: CreateCourse._id } }
    );
    // add course id to the tag document
    const TagData = await TagModel.findOneAndUpdate(
      { name: tag },
      { $push: { courseId: CreateCourse._id } },
      { upsert: true }
    );
    CreateCourse.tag = TagData._id;
    await CreateCourse.save();

    // response
    res
      .status(200)
      .json({ success: true, msg: "Course has been created Succesfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Down while Creating the Course",
    });
  }
};

// getAll Course

export const GetAllCourse = async (req, res) => {
  try {
    const AllCourse = await CourseModel.find(
      {},
      { title: true, description: true, thumbnail: true, price: true }
    );
<<<<<<< HEAD
    res.status(200).json({Courses:AllCourse})
=======
    res.status(200).json({ Courses: AllCourse });
>>>>>>> 33b5c81 (Added Files)
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Down while Displaying all  Courses",
    });
  }
};
