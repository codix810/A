"use client";

import { useCart } from "../../lib/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart }: any = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cash",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const total = cart.reduce(
    (s: number, i: any) => s + i.price * i.quantity,
    0
  );

  const submit = async () => {
  await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      paymentMethod: form.payment,
      items: cart,
      total,
    }),
  });
    console.log("Order Submitted:", form);

  router.push("/invoice");
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header & Logo Area */}
        <div className="bg-black py-8 text-center">
          <div className="inline-block bg-yellow-400 text-black font-black text-2xl px-4 py-1 rounded mb-2">
                              A&W<span className="text-sm">Store</span>

          </div>
          <h1 className="text-white text-xl font-light tracking-widest uppercase">
            Checkout Process
          </h1>
        </div>

        <div className="p-8 space-y-6">
          {/* Information Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b pb-2">
              Personal Information
            </h2>
            <input 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
              placeholder="Full Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
                placeholder="Email Address"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input 
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
                placeholder="Phone Number"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <textarea 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
              placeholder="Detailed Address"
              rows={3}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </section>

          {/* Payment Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b pb-2">
              Payment Method
            </h2>
            <select
              className="w-full p-3 bg-white border-2 border-black rounded-xl font-bold focus:ring-0 outline-none"
              onChange={(e) => setForm({ ...form, payment: e.target.value })}
            >
              <option value="cash"> Cash on delivery</option>
              <option value="visa"> Credit Card (Visa/Mastercard)</option>
              <option value="vodafone"> Vodafone Cash</option>
            </select>

            {/* Conditional Rendering for Visa */}
            {form.payment === "visa" && (
              <div className="p-4 bg-gray-900 rounded-2xl space-y-3 animate-in fade-in duration-500">
                <input 
                  className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg placeholder-gray-500" 
                  placeholder="Card Number (16 digits)"
                  onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg placeholder-gray-500" 
                    placeholder="MM/YY"
                    onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                  />
                  <input 
                    className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg placeholder-gray-500" 
                    placeholder="CVV"
                    onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Conditional Rendering for Vodafone Cash */}
            {form.payment === "vodafone" && (
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-2xl text-center animate-in zoom-in duration-300">
                <p className="text-sm text-gray-600 mb-2">Upload your transfer screenshot</p>
                <input type="file" className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer" />
              </div>
            )}

            {/* Cash on delivery notice */}
            {form.payment === "cash" && (
              <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 italic text-gray-600 text-sm">
                * Additional fees may apply for cash on delivery.
              </div>
            )}
          </section>

          {/* Final Button */}
          <button
            onClick={submit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-lg transform active:scale-95 transition-all duration-200 text-lg uppercase tracking-widest"
          >
            Confirm Order — ${total.toFixed(2)}
          </button>
          
          <p className="text-center text-xs text-gray-400">
            Secure encryption. Your data is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
}