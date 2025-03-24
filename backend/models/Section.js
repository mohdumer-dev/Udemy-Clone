import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SectionSchema = new Schema({
  name: { type: String },
  subSection: [
    {
      ref: "SubSection",
      type: ObjectId,
      // required:true
    },
  ],
});

export const SectionModel = mongoose.model("Section", SectionSchema);
