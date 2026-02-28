import { NextResponse } from "next/server";
import connectDB from "../../../../../../lib/db";
import Order from "../../../../../../models/Order";

export async function PUT(
  req: Request,
  context: any
) {
  await connectDB();

  const id = context.params.id;

  const order = await Order.findById(id);

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  /* cycle status */
  if (order.status === "pending")
    order.status = "shipped";
  else if (order.status === "shipped")
    order.status = "delivered";
  else
    order.status = "pending";

  await order.save();

  return NextResponse.json(order);
}
