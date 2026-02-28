import { NextResponse } from "next/server";
import connectDB from "../../../../../../lib/db";
import Order from "../../../../../../models/Order";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const order = await Order.findById(params.id);

  if (!order)
    return NextResponse.json({ error: "Not found" });

  /* cycle status */
  if (order.status === "pending")
    order.status = "shipped";
  else if (order.status === "shipped")
    order.status = "delivered";
  else order.status = "pending";

  await order.save();

  return NextResponse.json(order);
}