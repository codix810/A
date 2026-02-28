import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Order from "../../../../../models/Order";

export async function GET(
  req: Request,
  context: any
) {
  await connectDB();

  const id = context.params.id;

  const order = await Order.findById(id);

  return NextResponse.json(order);
}
