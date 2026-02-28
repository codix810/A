import connectDB from "../../../../../lib/db";
import Review from "../../../../../models/Review";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: any
) {
  await connectDB();

  const id = context.params.id;

  await Review.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
