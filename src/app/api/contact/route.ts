import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/db";
import Message from "../../../models/Message";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    await connectDB();

    const message = await Message.create({
      userId: decoded.userId, // ✅ أهم سطر
      name: body.name,
      email: body.email,
      message: body.message,
    });

    return NextResponse.json(message);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}