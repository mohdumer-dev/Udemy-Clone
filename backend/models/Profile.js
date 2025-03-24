import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dateofbirth: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  contactNumber: {
    type: String,
    trim: true,
  },
  about: { type: String },
});

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
