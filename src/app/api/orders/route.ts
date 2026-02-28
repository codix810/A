import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/db";
import Order from "../../../models/Order";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    /* ===== GET USER FROM TOKEN ===== */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let userId = null;

    if (token) {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      userId = decoded.userId; // ✅ هنا السر
    }

    await connectDB();

    /* ===== CLEAN ITEMS ===== */
    const cleanItems = body.items.map((i: any) => ({
      productId: i.id,
      title: i.title,
      price: i.price,
      color: i.color,
      size: i.size,
      quantity: i.quantity,
      image: i.image || null,
    }));

    const order = await Order.create({
      userId, // ✅ محفوظ تلقائياً
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      paymentMethod: body.paymentMethod,
      items: cleanItems,
      total: body.total,
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Order failed" },
      { status: 500 }
    );
  }
}