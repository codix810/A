import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../lib/db";
import UserA from "../../../models/userA";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
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

    // ✅ احفظ المستخدم في متغير
    const user = await UserA.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // ✅ انشاء التوكن
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        userId: user._id,
      },
  
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ cookies في Next 15 لازم await
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({
      message: "Account created successfully",
    });
  } catch (error: any) {
    console.log("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}