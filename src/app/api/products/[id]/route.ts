import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Product from "../../../../models/Product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const product = await Product.findById(params.id);

  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  /* ===== نفس منطق offers ===== */
  const discount = product.hasOffer ? 20 : 0;

  const newPrice =
    product.price - product.price * (discount / 100);

  return NextResponse.json({
    id: product._id.toString(),
    title: product.name,
    description: product.description,
    images: product.images,
    price: newPrice,        // ✅ السعر بعد الخصم
    oldPrice: product.price, // ✅ السعر قبل الخصم
    discount,
    colors: product.colors,
    sizes: product.sizes,
  });
}