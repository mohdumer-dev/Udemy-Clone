// create a section for the course

import { CourseModel } from "../models/Course.js";
import { SectionModel } from "../models/Section.js";

// create section
export const CreateSection = async (req, res) => {
  try {
    // data fetch
    const { courseId, name } = req.body;
    // validation
    if (!courseId || !name) {
      return res
        .status(400)
        .json({ success: false, msg: "Course has not been specified" });
    }
    // create section
    const Section = await SectionModel.create({ name });
    // create course
    const Course = await CourseModel.findOneAndUpdate(
      { _id: courseId },
      { $push: { courseContent: Section._id } },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Section has been added", Course });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Server Down While Creating a Section" });
  }
};

// update section
export const UpdateSection = async (req, res) => {
  try {
    // data fetch
    const { sectionId, name } = req.body;
    // validation
    if (!sectionId || !name) {
      return res
        .status(400)
        .json({ success: false, msg: "Fiedld should be filled " });
    }
    // upate the section
    const UpdateSectionDetail = await SectionModel.findOneAndUpdate(
      { _id: sectionId },
      { name }
    );
    res.status(200).json({ success: true, msg: "Updated the Section" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Server Down While Creating a Section" });
  }
};

// delete a section

export const DelteSection = async (req, res) => {
  try {
    // data fetch
    const { sectionId } = req.params;
    // validation
    if (!sectionId) {
      return res
        .status(400)
        .json({ success: false, msg: "Field should be filled " });
    }
    // delete the enrty from db  
    await SectionModel.findByIdAndDelete(sectionId );
    // delete the entry from course //TODO
    await CourseModel.findOneAndUpdate({_id:courseId},{$pull:{courseContent:sectionId}})
    return res
      .status(200)
      .json({ success: true, msg: "Section Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Server Down While Deleting a Section" });
  }
};
