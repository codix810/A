"use client";

import { useEffect, useState } from "react";
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">Users</p>
          <h2 className="text-3xl font-bold">--</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">Orders</p>
          <h2 className="text-3xl font-bold">--</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">Products</p>
          <h2 className="text-3xl font-bold">--</h2>
        </div>

      </div>
    </div>
  );
}