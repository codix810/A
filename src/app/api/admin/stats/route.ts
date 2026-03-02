import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import UserA from "../../../../models/userA";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";
import Review from "../../../../models/Review";
import Message from "../../../../models/Message";

export async function GET() {
  await connectDB();

  const users = await UserA.countDocuments();
  const orders = await Order.countDocuments();
  const products = await Product.countDocuments();
  const review = await Review.countDocuments();
  const message = await Message.countDocuments();

  return NextResponse.json({
    users,
    orders,
    products,
    review,
    message,
  });
}