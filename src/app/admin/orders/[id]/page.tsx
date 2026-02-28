"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InvoicePage() {
  const { id } = useParams();
  const [order, setOrder]: any = useState(null);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then(setOrder);
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white text-black p-10 mt-10">

      <h1 className="text-3xl font-bold mb-6">
        INVOICE
      </h1>

      <p>Name: {order.customerName}</p>
      <p>Phone: {order.phone}</p>
      <p>Address: {order.address}</p>

      <hr className="my-6"/>

      {order.items.map((item: any, i: number) => (
        <div key={i} className="flex justify-between py-2">
          <div>
            <p className="font-bold">{item.title}</p>
            <p>
              Size: {item.size} | Color: {item.color}
            </p>
          </div>

          <p>
            {item.quantity} × {item.price}
          </p>
        </div>
      ))}

      <hr className="my-6"/>

      <h2 className="text-xl font-bold">
        Total: {order.total} EGP
      </h2>

      <h3 className="mt-10 text-center font-bold">
                  A&W<span className="text-sm">Store</span>
      </h3>

      <button
        onClick={() => window.print()}
        className="mt-6 bg-black text-white px-6 py-2"
      >
        Print
      </button>
    </div>
  );
}