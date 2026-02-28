"use client";

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders]: any = useState([]);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  if (!orders.length)
    return <p className="p-10">No Orders Yet</p>;

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Orders Management
      </h1>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div
            key={order._id}
            className="bg-slate-800 p-6 rounded-xl"
          >
            {/* CUSTOMER */}
            <div className="mb-4">
              <p><b>Name:</b> {order.customerName}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Payment:</b> {order.paymentMethod}</p>

              <div className="flex justify-between items-center mt-4">

  {/* STATUS BADGE */}
  <span
    className={`px-3 py-1 rounded text-sm font-bold
      ${
        order.status === "pending"
          ? "bg-yellow-500 text-black"
          : order.status === "shipped"
          ? "bg-blue-500"
          : "bg-green-600"
      }`}
  >
{(order.status || "pending").toUpperCase()}
  </span>

  {/* CHANGE BUTTON */}
  <button
    onClick={async () => {
      await fetch(
        `/api/admin/orders/status/${order._id}`,
        { method: "PUT" }
      );

      location.reload();
    }}
    className="bg-white text-black px-4 py-1 rounded"
  >
    Change Status
  </button>

</div>
            </div>

            <hr className="my-4 border-slate-600"/>

            {/* ITEMS */}
            {order.items.map((item: any, i: number) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-slate-700"
              >
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-gray-400">
                    Size: {item.size} | Color: {item.color}
                  </p>
                </div>

                <p>
                  {item.quantity} × {item.price} EGP
                </p>
              </div>
            ))}

            {/* TOTAL */}
            <div className="flex justify-between mt-4">
              <h3 className="font-bold text-lg">
                Total: {order.total} EGP
              </h3>

              <button
                onClick={() =>
                  window.open(`/admin/orders/${order._id}`)
                }
                className="bg-white text-black px-4 py-2 rounded"
              >
                Print Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}