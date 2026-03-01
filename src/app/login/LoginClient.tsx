"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();

  const callbackUrl = params.get("callbackUrl") || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) router.push(callbackUrl);
    else setMsg(data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl space-y-5 text-white"
      >
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-300">
            سجل دخولك للوصول لحسابك
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            required
            placeholder="example@email.com"
            className="w-full p-3 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            required
            placeholder="********"
            className="w-full p-3 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {msg && (
          <p className="text-red-400 text-sm text-center">{msg}</p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-bold disabled:opacity-50"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-300">
          ليس لديك حساب؟{" "}
          <Link
            href="/register"
            className="text-blue-400 font-bold hover:underline"
          >
            إنشاء حساب
          </Link>
        </p>
      </form>
    </div>
  );
}