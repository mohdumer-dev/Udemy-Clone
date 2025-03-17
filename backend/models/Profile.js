import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  gender: {
    type: String,
  },
  dateofbirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  contactNumber: {
    type: String,
    trim: true,
  },
});

export  const ProfileModel=mongoose.model('Profile',ProfileSchema)
