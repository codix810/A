import { NextResponse } from "next/server";
import connectDB from "../../../../../../lib/db";
import Message from "../../../../../../models/Message";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  await connectDB();

  const message = await Message.findByIdAndUpdate(
    params.id,
    {
      reply: body.reply,
      repliedAt: new Date(),
    },
    { new: true }
  );

  return NextResponse.json(message);
}