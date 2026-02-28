import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Order from "../../../../models/Order";

export async function GET() {
  await connectDB();

  const order = await Order.findOne()
    .sort({ createdAt: -1 })
    .lean();

  if (!order) {
    return NextResponse.json({ order: null });
  }

  return NextResponse.json({ order });
}