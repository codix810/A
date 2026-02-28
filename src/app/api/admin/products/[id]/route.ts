import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Product from "../../../../../models/Product";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  await connectDB();

  const product = await Product.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(product);
}