import connectDB from "../../../../lib/db";
import Review from "../../../../models/Review";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Review.find().sort({createdAt:-1}));
}