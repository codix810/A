import { NextResponse } from "next/server";
import connectDB from "../../../../../../lib/db";
import Message from "../../../../../../models/Message";

export async function PUT(
  req: Request,
  context: any
) {
  const body = await req.json();

  await connectDB();

  const id = context.params.id;

  const message = await Message.findByIdAndUpdate(
    id,
    {
      reply: body.reply,
      repliedAt: new Date(),
    },
    { new: true }
  );

  return NextResponse.json(message);
}
