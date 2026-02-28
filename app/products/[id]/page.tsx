"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useCart } from "../../../lib/CartContext";


interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  colors: string[];
  sizes: string[];
}
export default function Page() {
  const { id } = useParams();
  const { addToCart }: any = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <p className="p-10">Loading...</p>;

  const addItem = () => {
    if (!selectedColor || !selectedSize) {
      alert("Choose size & color first");
      return;
    }

    addToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
      image: product.images[0],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-black text-white py-12 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* ===== Images ===== */}
        <div>
          <div className="relative w-full h-[420px] mb-4">
            <Image
              src={product.images[activeImage]}
              alt={product.title}
              fill
              className="object-cover rounded-2xl"
              
            />
            
          </div>

          {/* thumbnails */}
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  activeImage === i
                    ? "border-amber-400"
                    : "border-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== Details ===== */}
        <div className="flex flex-col gap-6">

          <h1 className="text-4xl font-extrabold">
            {product.title}
          </h1>

          <p className="text-gray-300">
            {product.description}
          </p>

          {/* rating */}
          <div className="flex items-center gap-1 text-amber-400">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
            <span className="ml-2 text-sm text-gray-400">
              (120 reviews)
            </span>
          </div>

          {/* price */}
<div className="flex items-center gap-3">

  <span className="text-3xl font-bold">
    ${product.price.toFixed(2)}
  </span>

{product.oldPrice && (product.discount ?? 0) > 0 && (
      <>
      <span className="line-through text-gray-400">
        ${product.oldPrice}
      </span>

      <span className="bg-yellow-400 text-black px-2 py-1 text-sm font-bold rounded">
        -{product.discount}%
      </span>
    </>
  )}

</div>

          {/* COLORS */}
          <div>
            <h3 className="mb-2 font-semibold">Colors</h3>
            <div className="flex gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === c
                      ? "border-white scale-110"
                      : "border-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <h3 className="mb-2 font-semibold">Sizes</h3>
            <div className="flex gap-3">
              {product.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === s
                      ? "bg-amber-500 text-black"
                      : "border-gray-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={addItem}
            className="mt-6 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold"
          >
            Add to Cart 🛒
          </button>

        </div>
      </div>
    </div>
  );
}
