import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Product from "../../../../../models/Product";

/* DELETE PRODUCT */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}

/* UPDATE PRODUCT */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();

  await connectDB();

  const { id } = await params;

  const product = await Product.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(product);
}
