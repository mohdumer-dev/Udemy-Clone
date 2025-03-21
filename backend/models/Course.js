import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: ObjectId, ref: "User", required: true },
  whatYouLearn: { type: String },
  ratingReview: [{ type: ObjectId, ref: "RatingReview" }],
  price: { type: Number, required: true },
  thumbnail: { type: String },
  courseContent: [{ ref: "Section", type: ObjectId }],
  tag: { type: ObjectId, ref: "Tags" },
  studentEnrolled: [{ type: ObjectId, ref: "User",  }],
});

export const CourseModel = mongoose.model("Course", CourseSchema);
