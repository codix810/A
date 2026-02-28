import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Order from "../../../../../models/Order";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const order = await Order.findById(params.id);

  if (!order)
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );

  return NextResponse.json(order);
}