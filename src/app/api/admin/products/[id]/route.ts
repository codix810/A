import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Product from "../../../../../models/Product";

/* DELETE PRODUCT */
export async function DELETE(
  req: Request,
  context: any
) {
  await connectDB();

  const id = context.params.id;

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}

/* UPDATE PRODUCT */
export async function PUT(
  req: Request,
  context: any
) {
  const body = await req.json();

  await connectDB();

  const id = context.params.id;

  const product = await Product.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(product);
}
