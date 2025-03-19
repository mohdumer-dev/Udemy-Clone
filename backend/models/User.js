import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new Schema({
  firstname: {
    type: String,
    require: true,
    trim: true,
  },
  lastname: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  accountType: {
    type: String,
    enum: ["Student", "Instructor", "Admin"],
    require: true,
  },
  additionalDetails: { type: ObjectId, ref: "Profile", require: true },
  courses: [{ type: ObjectId, refF: "Course" }],
  image: { type: String, require: true },
  courseProgress: [{ type: ObjectId, ref: "Course Progress" }],//
});

export const UserModel=mongoose.model('User',UserSchema)

