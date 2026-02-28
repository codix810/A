"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
});
useEffect(() => {
  const loadUser = async () => {
    const res = await fetch("/api/me");

    if (!res.ok) return;

    const user = await res.json();

    setForm((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
    }));
  };

  loadUser();
}, []);
const submit = async (e: any) => {
  e.preventDefault();

  await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  alert("✅ Message sent successfully");

  setForm((prev) => ({ ...prev, message: "" }));
};
  return (
    <section className=" w-full">
      {/* Background Image */}
      <div className="w-full h-[60vh] lg:h-[75vh] relative">
        <Image
          src="/Hero/Rectangle 2.png"
          alt="contact-hero"
          fill
          priority
          className="object-cover w-full h-full"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-black/40 lg:bg-black/30">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Let’s <span className="text-black">Connect</span> <br />
            and Build<span className="text-black">Something</span>  <br />
            <span className="text-gray-200">Remarkable <span className="text-black">Together</span></span>
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-200 max-w-xl mt-4">
            Whether you have a question, need support, or want to collaborate —
            we’re here to help. Reach out to us anytime and we’ll get back to
            you shortly.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 px-6 sm:px-12 lg:px-24 py-16 bg-gray-100 shadow-inner">
        {/* Left Side - Info */}
        <div className="space-y-8 max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Contact Information
          </h2>
          <p className="text-gray-600 text-lg">
            Feel free to reach out through any of the methods below. We’re happy
            to assist you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FiMail size={24} className="text-black" />
              <span className="text-gray-700">support@awstore.com</span>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone size={24} className="text-black" />
              <span className="text-gray-700">+20 123 456 7890</span>
            </div>

            <div className="flex items-center gap-4">
              <FiMapPin size={24} className="text-black" />
              <span className="text-gray-700">Cairo, Egypt</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-[55%] p-8 bg-gray-50 rounded-3xl shadow-xl border border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h3>

<form onSubmit={submit} className="space-y-5">
<input
  value={form.name}
  onChange={(e) =>
    setForm({ ...form, name: e.target.value })
  }              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:outline-none"
            />

            <input
  value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:outline-none"
            />

<textarea
  value={form.message}
  onChange={(e) =>
    setForm({ ...form, message: e.target.value })
  }              rows={5}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
