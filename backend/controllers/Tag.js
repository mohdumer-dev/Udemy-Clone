import { TagModel } from "../models/Tag.js";

// create a tag
export const createTag = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;
    // validation
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, msg: "Field can't be left blank" });
    }
    // creating tag in db
    const Tag = await TagModel.create({ name, description });
    // sending resspond
    return res
      .status(200)
      .json({ success: true, msg: "Tag has been created successfully", Tag });
  } catch (err) {
    res.status(500).json({ msg: "Server Down while creating Tags" });
  }
};

// getAll Tag
export const AllTag = async (req, res) => {
  try {
    // get tag from db
    const AllTag = await TagModel.find({}, { name: true, description: true });
    // return the tag
    return res.status(200).json({ success: true, AllTag });
  } catch (err) {
    res.status(500).json({ msg: "Server Down while Getting All Tags" });
  }
};
