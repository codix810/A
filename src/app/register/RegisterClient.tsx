"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Creating account...");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(callbackUrl); // 🔥 redirect
    } else {
      setMsg(data.error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl w-96 space-y-4 shadow-2xl"
      >
        <h2 className="text-2xl text-black font-bold text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded bg-white text-black"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white text-black"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-white text-black"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Register
        </button>

        <p className="text-center text-sm text-black">{msg}</p>
          <p className="text-center text-sm text-black">
  لديك حساب بالفعل؟{" "}
  <Link
    href="/login"
    className="text-blue-500 font-bold hover:underline"
  >
    تسجيل الدخول
  </Link>
</p>
      </form>
    </div>
  );
}