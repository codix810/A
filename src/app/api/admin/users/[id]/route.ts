import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import UserA from "../../../../../models/userA";

export async function DELETE(
  req: Request,
  context: any
) {
  await connectDB();

  const id = context.params.id;

  await UserA.findByIdAndDelete(id);

  return NextResponse.json({ message: "User deleted" });
}
