import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Product from "../../../models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find().sort({ createdAt: -1 });

  /* تحويل شكل الداتا للي الكومبوننت فاهمه */
  const formatted = products.map((p) => ({
    id: p._id,
    title: p.name,
    description: p.description,
    price: p.price,
    image: p.images?.[0], // اول صورة
    gender: p.gender,
    colors: p.colors,
    sizes: p.sizes,
  }));

  return NextResponse.json(formatted);
}