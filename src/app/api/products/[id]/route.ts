import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Product from "../../../../models/Product";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ params بقت Promise
) {
  await connectDB();

  // ✅ لازم await
  const { id } = await context.params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  /* offer logic */
  const discount = product.hasOffer ? 20 : 0;

  const newPrice =
    product.price - product.price * (discount / 100);

  return NextResponse.json({
    id: product._id.toString(),
    title: product.name,
    description: product.description,
    images: product.images,
    price: newPrice,
    oldPrice: product.price,
    discount,
    colors: product.colors,
    sizes: product.sizes,
  });
}
