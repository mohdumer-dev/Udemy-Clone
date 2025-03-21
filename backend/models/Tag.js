import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const TagSchema = new Schema({
  courseId: [{ type: ObjectId, ref: "Course" }],
  name: { type: String, unique: true },
  description: { type: String },
});
export const TagModel = mongoose.model("Tag", TagSchema);

// no samaj  aya
