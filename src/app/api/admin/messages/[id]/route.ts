import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Message from "../../../../../models/Message";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Message.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}