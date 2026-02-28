"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../lib/CartContext";

export default function ProductsByCategory({
  api,
  title,
}: {
  api: string;
  title: string;
}) {
  const { addToCart }: any = useCart();
  const [products, setProducts]: any = useState([]);

  useEffect(() => {
    fetch(api)
      .then((r) => r.json())
      .then(setProducts);
  }, [api]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-10">

      <h2 className="text-center text-white text-5xl font-extrabold py-12">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">

        {products.map((product: any) => (
          <div
            key={product.id}
            className="group relative w-72 bg-black/40 border border-gray-700 rounded-2xl overflow-hidden hover:scale-105 transition"
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative h-52">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  className="object-cover"
                />

                {product.discount > 0 && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </Link>

            <div className="p-4">
              <h3 className="text-white font-bold">
                {product.title}
              </h3>

              <div className="flex justify-between mt-3">
                <div>
                  <p className="text-white font-bold">
                    ${product.price.toFixed(2)}
                  </p>

                  {product.oldPrice && (
                    <p className="line-through text-gray-400 text-sm">
                      ${product.oldPrice}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-yellow-400 text-black px-3 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}