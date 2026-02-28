"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Invoice() {
  const [order, setOrder]: any = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/orders/latest", {
          cache: "no-store",
        });

        const data = await res.json();

        // يدعم الشكلين (data أو data.order)
        setOrder(data.order || data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  /* ===== Loading ===== */
  if (!order) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  /* حماية إضافية */
  const items = order.items || [];

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 mt-10 text-black">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        INVOICE
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Order ID: {order._id}
      </p>

      {/* CUSTOMER */}
      <p>Name: {order.customerName}</p>
      <p>Phone: {order.phone}</p>
      <p>Address: {order.address}</p>
      <button className="mt-6 bg-black text-white px-6 py-2">
           <Link
            href="/track-order"
          >
            تتبع طلبك
          </Link>
      </button>
      <hr className="my-6" />

      {/* ITEMS */}
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map((item: any, i: number) => (
          <div key={i} className="flex justify-between py-2">
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-gray-600">
                Size: {item.size} | Color: {item.color}
              </p>
            </div>

            <p>
              {item.quantity} × {item.price} EGP
            </p>
          </div>
        ))
      )}

      <hr className="my-6" />

      {/* TOTAL */}
      <h2 className="text-xl font-bold">
        Total: {order.total} EGP
      </h2>

      <p className="mt-2">
        Payment: {order.paymentMethod}
      </p>

      {/* BRAND */}
      <h3 className="mt-10 text-center font-bold">
        A&W<span className="text-sm">Store</span>
      </h3>

      {/* PRINT */}
      <button
        onClick={() => window.print()}
        className="mt-6 bg-black text-white px-6 py-2"
      >
        Print
      </button>
    </div>
  );
}