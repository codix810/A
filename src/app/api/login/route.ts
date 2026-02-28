import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "../../../lib/db";
import UserA from "../../../models/userA";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const user = await UserA.findOne({ email });

    if (!user)
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return NextResponse.json(
        { error: "Wrong password" },
        { status: 400 }
      );

    const token = jwt.sign(
  {
    userId: user._id,   // ✅ مهم جدا
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);
const cookieStore = await cookies();

cookieStore.set("token", token, {
  httpOnly: true,
  path: "/",
});
    return NextResponse.json({ message: "Logged in" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}