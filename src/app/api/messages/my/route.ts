import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../../lib/db";
import Message from "../../../../models/Message";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const decoded: any = jwt.verify(
    token!,
    process.env.JWT_SECRET!
  );

  await connectDB();

  const messages = await Message.find({
    userId: decoded.userId,
  });

  return NextResponse.json(messages);
}