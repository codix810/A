"use client";

import { useState } from "react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder]: any = useState(null);
  const [error, setError] = useState("");

  const track = async () => {
    setError("");
    setOrder(null);

    const res = await fetch(`/api/orders/track/${orderId}`);

    if (!res.ok) {
      setError("Order not found");
      return;
    }

    const data = await res.json();
    setOrder(data);
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-xl shadow text-black">

      <h1 className="text-3xl font-bold text-center mb-6">
        Track Your Order
      </h1>

      {/* input */}
      <div className="flex gap-2">
        <input
          placeholder="Enter Order ID"
          className="input flex-1"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <button
          onClick={track}
          className="bg-black text-white px-6 rounded"
        >
          Track
        </button>
      </div>

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {/* RESULT */}
      {order && (
        <div className="mt-8 border-t pt-6 space-y-3">

          <p><b>Name:</b> {order.customerName}</p>
          <p><b>Phone:</b> {order.phone}</p>

          {/* STATUS */}
          <div className="mt-4">
            <p className="font-bold mb-2">Status:</p>

            <div className="flex gap-4">

              <Step
                active={true}
                done={true}
                label="Pending"
              />

              <Step
                active={
                  order.status === "shipped" ||
                  order.status === "delivered"
                }
                done={
                  order.status === "shipped" ||
                  order.status === "delivered"
                }
                label="Shipped"
              />

              <Step
                active={order.status === "delivered"}
                done={order.status === "delivered"}
                label="Delivered"
              />

            </div>
          </div>

        </div>
      )}
    </div>
  );
}

/* STEP UI */
function Step({ active, done, label }: any) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full ${
          done ? "bg-black text-white" : "bg-gray-200"
        } flex items-center justify-center`}
      >
        ✓
      </div>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}