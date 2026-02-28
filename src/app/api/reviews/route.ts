import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/db";
import Review from "../../../models/Review";
import UserA from "../../../models/userA";

export async function POST(req: Request) {
  const body = await req.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded: any = jwt.verify(
    token,
    process.env.JWT_SECRET!
  );

  await connectDB();

  // ✅ نجيب الاسم الحقيقي من DB
  const user = await UserA.findById(decoded.userId);

  const review = await Review.create({
    userId: decoded.userId,
    name: user?.name || "User",
    rating: body.rating,
    message: body.message,
  });

  return NextResponse.json(review);
}

export async function GET() {
  await connectDB();

  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .limit(20);

  return NextResponse.json(reviews);
}