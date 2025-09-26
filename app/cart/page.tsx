"use client";
import { useCart } from "@/lib/usecart";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-gray-400">Cart is empty 🛒</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <span>{item.title} (x{item.quantity})</span>
          <span>${item.price * (item.quantity || 1)}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="mt-4 text-xl font-bold">Total: ${total}</h2>

      <button
        onClick={clearCart}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
