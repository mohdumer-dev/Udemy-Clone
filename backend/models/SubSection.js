import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SubSectionSchema = new Schema({
//   courseId: { type: ObjectId, ref: "" },
  title: { type: String },
  // description: { type: String },
  video: { type: String },
  timeDuration: { type: String },
});

export const SubSectionModel = mongoose.model("SubSection", SubSectionSchema);
