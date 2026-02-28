import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import UserA from "../../../../models/userA";

export async function GET() {
  await connectDB();

  const users = await UserA.find().select("-password");

  return NextResponse.json(users);
}