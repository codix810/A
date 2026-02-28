import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    userId: String,
    name: String,

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    message: String,
  },
  { timestamps: true }
);

export default models.Review || model("Review", ReviewSchema);