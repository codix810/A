import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },

    description: { type: String },

    price: { type: Number, required: true },

    hasOffer: { type: Boolean, default: false },

    images: {
      type: [String],
      validate: [(arr: string[]) => arr.length <= 5, "Max 5 images"],
    },

    colors: [String],

    sizes: [String],

    gender: {
      type: String,
      enum: ["men", "women", "unisex"],
      default: "unisex",
    },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);