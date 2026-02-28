import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Message from "../../../../../models/Message";

export async function DELETE(
  req: NextRequest,
  context: any
) {
  await connectDB();

  const id = context.params.id;

  await Message.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
