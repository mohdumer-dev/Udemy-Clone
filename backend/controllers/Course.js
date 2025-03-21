// create a course

import { CourseModel } from "../models/Course.js";
import { TagModel } from "../models/Tag.js";
import { UserModel } from "../models/User.js";
import { UploadImage } from "../utils/ImageUploader.js";

export const createCourse = async (req, res) => {
  try {
    // get the data
    const { title, description, price, whatYouLearn, thumbnail, tag } =
      req.body;

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
      thumbnail,
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
