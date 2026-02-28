"use client";

import { useCart } from "../../lib/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
  }: any = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-500 space-y-4">
        <Image
          src="/New/empty-shopping-cart.jpg"
          alt="Empty cart"
          width={450}
          height={280}
          className="opacity-80 rounded-lg shadow-md"
        />
        <p className="text-xl font-medium mt-4">
          Your cart is currently empty 🛒
        </p>

        <Link
          href="/products"
          className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = cart.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto mb-10 p-8 bg-white shadow-lg rounded-2xl mt-10 border border-gray-100">

      <h1 className="text-4xl font-bold mb-8 text-center text-black">
        🛍️ Your Shopping Cart
      </h1>

      <div className="space-y-5">
        {cart.map((item: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            {/* LEFT */}
            <div className="flex items-center gap-5">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-lg object-contain bg-gray-100 p-2"
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.title}
                </h3>

                {/* ✅ color + size */}
                <p className="text-sm text-gray-500">
                  Color: <b>{item.color}</b> |
                  Size: <b>{item.size}</b>
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  ${item.price.toFixed(2)} each
                </p>

                {/* quantity */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-semibold text-gray-700">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p className="font-bold text-gray-800 text-lg mb-2">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold text-black">
          Total:
          <span className="text-black ml-2">
            ${total.toFixed(2)}
          </span>
        </h2>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={clearCart}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Clear Cart
          </button>

          <Link
            href="/checkout"
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;