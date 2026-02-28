import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Order from "../../../../../models/Order";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const order = await Order.findById(params.id);

  return NextResponse.json(order);
}