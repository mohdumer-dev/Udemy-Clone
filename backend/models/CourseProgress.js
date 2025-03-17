import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CourseProgressSchema = new Schema({
  courseId: { type: ObjectId, ref: "Course" },
  completedVideos: [{ ref: "SubSection", type: ObjectId }],
});

export const CourseModel = mongoose.model(
  "CourseProgress",
  CourseProgressSchema
);
