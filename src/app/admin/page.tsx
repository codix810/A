"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    review:0,
    message:0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-gray-400">Users</p>
          <h2 className="text-3xl font-bold text-blue-400">
            {stats.users}
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-gray-400">Orders</p>
          <h2 className="text-3xl font-bold text-green-400">
            {stats.orders}
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-gray-400">Products</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {stats.products}
          </h2>
        </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-gray-400">Review</p>
          <h2 className="text-3xl font-bold text-orange-400">
            {stats.review}
          </h2>
        </div>       
        
         <div className="bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-gray-400">Message</p>
          <h2 className="text-3xl font-bold text-red-400">
            {stats.message}
          </h2>
        </div>

      </div>
    </div>
  );
}
