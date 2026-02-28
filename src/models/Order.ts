import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: String,

    customerName: String,
    phone: String,
    address: String,

    paymentMethod: String,

    items: [
      {
        productId: String,
        title: String,
        price: Number,
        color: String,
        size: String,
        quantity: Number,
      },
    ],

    total: Number,
    status: {
  type: String,
  enum: ["pending", "shipped", "delivered"],
  default: "pending",
},
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);