"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { typeProduct } from "./type";
import toast from "react-hot-toast";

type CartContextType = {
  cart: typeProduct[];
  addToCart: (product: typeProduct) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<typeProduct[]>([]);

  // تحميل البيانات من localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // تحديث localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ إضافة منتج مرة واحدة فقط
  const addToCart = (product: typeProduct) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {       
      // لو المنتج موجود، ما نزودوش تاني
      toast.error('This product is already in the cart!');
      return ;
    }
    // أول مرة يضاف بكمية = 1
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success('The product has been added to the cart successfully ⭐'); 
  };

  // ✅ زيادة الكمية
  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // ✅ تقليل الكمية (وحذف المنتج لو وصلت 0)
 const decreaseQuantity = (id: number) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
          : item
      )
      .filter((item) => (item.quantity ?? 0)> 0)
  );
 };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  // if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}