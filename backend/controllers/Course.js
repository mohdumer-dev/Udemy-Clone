// create a course

import { CourseModel } from "../models/Course.js";
import { CategoryModel } from "../models/Category.js";
import { UserModel } from "../models/User.js";
import { UploadImage } from "../utils/ImageUploader.js";

import { ImageValidation } from "../validators/Imagvalidation.js";

export const createCourse = async (req, res) => {
  try {
    // get the data

    const { title, description, price, whatYouLearn, Category } = req.body;
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !title ||
      !description ||
      !price ||
      !whatYouLearn ||
      !thumbnail ||
      !Category
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    // imagevalidation
    const FileType = thumbnail.name.split(".")[1];

    // Call the ImageValidation
    const { success, msg } = ImageValidation(FileType);
    if (!success) {
      return res.status(400).json({ success: false, msg });
    }

    // get the Category model
    const GetCategory = await CategoryModel.findOne({ name: Category });

    // check the Category
    if (!GetCategory) {
      return res
        .status(400)
        .json({ success: false, msg: "Category  not found" });
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
    // add course id to the Category document
    const CategoryData = await CategoryModel.findOneAndUpdate(
      { name: Category },
      { $push: { courseId: CreateCourse._id } },
      { upsert: true }
    );
    CreateCourse.Category = CategoryData._id;
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
    ).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    }).exec()

    res.status(200).json({ Courses: AllCourse });

  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Down while Displaying all  Courses",
    });
  }
};
