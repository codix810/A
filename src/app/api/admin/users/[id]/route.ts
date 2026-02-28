import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import UserA from "../../../../../models/userA";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await UserA.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "User deleted" });
}