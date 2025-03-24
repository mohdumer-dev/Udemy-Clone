import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new Schema({
  courseId: [{ type: ObjectId, ref: "Course" }],
  name: { type: String, unique: true },
  description: { type: String },
});
export const CategoryModel = mongoose.model("Category", CategorySchema);

// no samaj  ay
