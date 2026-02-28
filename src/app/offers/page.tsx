"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useCart } from "../../lib/CartContext";
import { ReactNode, useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { stringify } from "querystring";


type Product = {
id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  discount?: number; // ← نسبة الخصم
};

type OffersProps = {
  id: any;
  image: string | StaticImport;
  title: ReactNode;
  price: ReactNode;
  discount: any;
  products: Product[];
  titleName: string;
};

const Offers = ( ) => {
  const { addToCart }: any = useCart();
  const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
const res = await fetch("/api/products/offers");  
          if (!res.ok) throw new Error("Failed to fetch products");
  
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-gray-900 pb-10">
      <h2 className="text-center text-red-400 text-5xl font-extrabold py-12 drop-shadow-lg">
        HOT OFFER 🔥
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center px-3">
       {products.length === 0 && (
  <p className="text-center text-white text-xl">
    No Offers Available 🔥
  </p>
)}
        {products.map((product) => {
          const newPrice = Number(product.discount)
            ? Number(product.price) - Number(product.price) * (Number(product.discount) / 100)
            : Number(product.price);

          return (
            <div
              key={product.id}
              className="group relative w-72 bg-black/40 border border-red-700 rounded-2xl shadow-xl hover:shadow-red-500/40 overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt ={""}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* OFFER BADGE */}
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    HOT OFFER 🔥
                  </span>

                  {/* Discount Badge */}
                  {product.discount && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {product.title}
                </h2>

                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                  <span className="ml-2 text-sm text-gray-400">(320 reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-white">${newPrice.toFixed(2)}</p>

                    {product.discount && (
                      <p className="text-sm text-gray-400 line-through">${product.price}</p>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 cursor-pointer"
                  >
                    Add Deal 🛒
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
