import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const RatingReviewSchema = new Schema({
  userId: { type: ObjectId, ref: "User" },
  rating: { type: Number, require: true },
  review: { type: String, require: true },
});

export const RatingReviewModel = mongoose.model(
  "RatingReview",
  RatingReviewSchema
);
