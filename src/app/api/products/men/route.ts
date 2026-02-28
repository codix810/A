import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Product from "../../../../models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find({
    gender: "men",
  });

  const formatted = products.map((p) => {
    const discount = p.hasOffer ? 20 : 0;

    const price =
      p.price - p.price * (discount / 100);

    return {
      id: p._id.toString(),
      title: p.name,
      image: p.images?.[0],
      price,
      oldPrice: discount ? p.price : null,
      discount,
    };
  });

  return NextResponse.json(formatted);
}