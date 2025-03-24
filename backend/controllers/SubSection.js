// create a Subsection for the course

import { convertDuration } from "../logic/simpleTimeConvert.js";
import { SectionModel } from "../models/Section.js";
import { SubSectionModel } from "../models/SubSection.js";
import { UploadImage } from "../utils/ImageUploader.js";
import { UploadVideo } from "../utils/VideoUpload.js";

//  create SubSection
export const createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title } = req.body;
    const video = req.files.video;
    // validate
    if (!sectionId || !title || !video) {
      return res
        .status(400)
        .json({ success: false, msg: "Course has not been specified" });
    }
    // get cloudinary link
    const video_data = await UploadVideo(video, "Video_Course");

    // converting time

    const { hours, minutes, seconds } = convertDuration(video_data.duration);

    // create SubSection
    const SubSection = await SubSectionModel.create({
      title,
      video: video_data.secure_url,
      timeDuration: `${hours}h:${minutes}m:${seconds}s`,
    });
    // Update  Section
    const Section = await SectionModel.findOneAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSection._id } },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, msg: "SubSection has been added", Section });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Server Down While Creating a SubSection" });
  }
};

// update SubSection
export const updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { ss_id, title } = req.body;
    const video = req.files.video;
    // validate
    if (!ss_id || !title) {
      return res
        .status(400)
        .json({ success: false, msg: "Field are not filled" });
    }
    if (video) {
      // get cloudinary link
      const video_data = await UploadVideo(video, "Video_Course");
      // converting time
      const { hours, minutes, seconds } = convertDuration(video_data.duration);

      // need to change everything
      const SubSection = await SubSectionModel.findOneAndUpdate(
        { _id: ss_id },
        {
          title,
          video: video_data.secure_url,
          timeDuration: `${hours}h:${minutes}m:${seconds}s`,
        }
      );

      return res.status(200).json({
        success: true,
        msg: "SubSection has been updated",
        SubSection,
      });
    }
    // If title need to be changed
    const SubSection = await SubSectionModel.findOneAndUpdate(
      { _id: ss_id },
      { title }
    );
    return res.status(200).json({
      success: true,
      msg: "SubSection has been updated successfully",
      SubSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Down While Updating the SubSection",
    });
  }
};

// delete SubSection

export const DelelteSubSection = async (req, res) => {
  try {
    // get the data
    const { ss_id } = req.body;
    if(!ss_id){
      return res
        .status(400)
        .json({ success: false, msg: "Field are not filled" });
    }
    // delete the subSection
    await SubSectionModel.findOneAndUpdate({_id:ss_id})

    // return message

    res.status(200).json({success:true,msg:"SubSection has been deleted"})


  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Down While Deleting the SubSection",
    });
  }
};
