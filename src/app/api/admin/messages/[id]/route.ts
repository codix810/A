import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Message from "../../../../../models/Message";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();

  const { id } = context.params;

  await Message.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
