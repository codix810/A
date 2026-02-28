"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();

  const [user, setUser]: any = useState(null);
  const [orders, setOrders]: any = useState([]);
  const [loading, setLoading] = useState(true);
const [messages, setMessages]: any = useState([]);

  useEffect(() => {
const load = async () => {
  const res = await fetch("/api/me");

  if (!res.ok) {
    router.push("/login?callbackUrl=/profile");
    return;
  }

  const userData = await res.json();
  setUser(userData);

  const ordersRes = await fetch("/api/orders/my");
  setOrders(await ordersRes.json());

  const msgRes = await fetch("/api/messages/my");
  setMessages(await msgRes.json());

  setLoading(false);
};

    load();
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-black p-10">

      {/* USER CARD */}
      <div className="border border-black p-6 mb-10">
        <h1 className="text-2xl font-bold mb-3">
          Profile
        </h1>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>

        <button
          onClick={logout}
          className="mt-4 bg-yellow-400 px-5 py-2 font-bold"
        >
          Logout
        </button>
      </div>

      {/* ORDERS */}
      <h2 className="text-3xl font-bold mb-6">
        My Orders
      </h2>

      <div className="space-y-8">

        {orders.map((order: any) => (
          <div
            key={order._id}
            className="border border-black p-6"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between mb-4">
              <p>
                <b>Tracking ID:</b> {order._id}
              </p>

              <Status status={order.status} />
            </div>

            {/* ITEMS */}
            {order.items.map((item: any, i: number) => (
              <div
                key={i}
                className="flex gap-5 items-center border-t pt-4 mt-4"
              >
                <div className="relative w-24 h-24">
{item.image ? (
  <Image
    src={item.image}
    alt={item.title}
    fill
    className="object-cover"
  />
) : (
  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
    No Image
  </div>
)}
                </div>

                <div className="flex-1">
                  <p className="font-bold">{item.title}</p>

                  <p className="text-sm">
                    Size: {item.size} | Color: {item.color}
                  </p>

                  <p className="font-bold">
                    {item.price} EGP
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 font-bold">
              Total: {order.total} EGP
            </div>
          </div>
          
        ))}
{/* MESSAGES */}
<h2 className="text-3xl font-bold mt-14 mb-6">
  My Messages
</h2>

<div className="space-y-6">

  {messages.length === 0 && (
    <p>No messages yet.</p>
  )}

  {messages.map((msg: any) => (
    <div
      key={msg._id}
      className="border border-black p-6"
    >
      {/* USER MESSAGE */}
      <p className="font-bold mb-2">
        Your Message:
      </p>

      <p className="mb-4">
        {msg.message}
      </p>

      {/* ADMIN REPLY */}
      {msg.reply ? (
        <div className="bg-yellow-100 border border-yellow-400 p-4">
          <p className="font-bold">
            Admin Reply:
          </p>
          <p>{msg.reply}</p>
        </div>
      ) : (
        <p className="text-gray-400">
          Waiting for admin reply...
        </p>
      )}
    </div>
  ))}

</div>
      </div>
    </div>
    
  );
}

/* STATUS UI */

function Status({ status }: any) {
  const styles: any = {
    pending: "bg-gray-200",
    shipped: "bg-yellow-400",
    delivered: "bg-black text-white",
  };

  return (
    <span className={`px-4 py-1 font-bold ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}