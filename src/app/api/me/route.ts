import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/db";
import UserA from "../../../models/userA";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ مهم
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    await connectDB();

    const user = await UserA.findOne({
      email: decoded.email,
    }).select("-password");

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}