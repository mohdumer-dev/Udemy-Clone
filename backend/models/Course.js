import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CourseSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  intructor: { type: ObjectId, ref: "User", require: true },
  whatYouLearn: { type: String },
  ratingReview: [{ type: ObjectId, ref: "RatingReview" }],
  price: { type: Number, require: true },
  thumbnail: { type: String },
  courseContent: [{ ref: "Section", type: ObjectId }],
  tag: { type: ObjectId, ref: "Tags" },//
  studentEnrolled: [{ type: ObjectId, ref: "User", require: true }],
});

export const CourseModel = mongoose.model("Course", CourseSchema);
