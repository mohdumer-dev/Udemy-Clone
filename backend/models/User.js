import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Student", "Instructor", "Admin"],
    required: true,
  },
  additionalDetails: { type: ObjectId, ref: "Profile", required: true },
  courses: [{ type: ObjectId, ref: "Course" }],
  image: { type: String, required: true },
  courseProgress: [{ type: ObjectId, ref: "Course Progress" }], //Problem
});

export const UserModel=mongoose.model('User',UserSchema)

