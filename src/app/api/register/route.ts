import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "../../../lib/db";
import UserA from "../../../models/userA";
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await UserA.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const usersCount = await UserA.countDocuments();

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = usersCount === 0 ? "admin" : "user";

    const newUser = await UserA.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // ✅ إنشاء التوكن
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ تخزين الكوكي بشكل صحيح للـ Production
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return NextResponse.json({
      message: "Account created successfully",
    });

  } catch (error: any) {
    console.log("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
