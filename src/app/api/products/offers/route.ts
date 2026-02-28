import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Product from "../../../../models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find({
    hasOffer: true,
  });

  const formatted = products.map((p) => ({
    id: p._id.toString(),
    title: p.name,
    price: p.price,
    image: p.images?.[0],
    discount: 20, // ثابت 20%
  }));

  return NextResponse.json(formatted);
}