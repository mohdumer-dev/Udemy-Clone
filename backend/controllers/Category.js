import { CategoryModel } from "../models/Category.js";

// create a Category
export const createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;
    // validation
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, msg: "Field can't be left blank" });
    }
    // creating Category in db
    const Category = await CategoryModel.create({ name, description });
    // sending resspond
    return res
      .status(200)
      .json({ success: true, msg: "Category has been created successfully", Category });
  } catch (err) {
    res.status(500).json({ msg: "Server Down while creating Categorys" });
  }
};

// getAll Category
export const AllCategory = async (req, res) => {
  try {
    // get Category from db
    const AllCategory = await CategoryModel.find({}, { name: true, description: true });
    // return the Category
    return res.status(200).json({ success: true, AllCategory });
  } catch (err) {
    res.status(500).json({ msg: "Server Down while Getting All Categorys" });
  }
};
