import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    userId: String,

    name: String,
    email: String,

    message: String,

    reply: {
      type: String,
      default: "",
    },

    repliedAt: Date,
  },
  { timestamps: true }
);

export default models.Message || model("Message", MessageSchema);