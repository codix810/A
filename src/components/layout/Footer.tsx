"use client";

import { useState, useEffect } from "react";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {

  const [user, setUser]: any = useState(null);
const [rating, setRating] = useState(5);
const [message, setMessage] = useState("");

useEffect(() => {
  fetch("/api/me")
    .then(r => r.json())
    .then(setUser)
    .catch(()=>{});
}, []);

const submitReview = async () => {
  await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rating,
      message,
    }),
  });

  alert("Review sent ✅");
  setMessage("");
};

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto text-center flex flex-col md:flex-row items-center justify-between bg-black rounded-2xl shadow-lg p-10 -mt-24">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
          STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col items-center justify-center gap-4">
<div className="flex flex-col items-center gap-3">

  {/* BRAND NAME */}
  <p className="text-white font-bold">
    {user?.name || "Guest"}
  </p>

  {/* STARS */}
  <div className="flex gap-2 text-amber-400 text-xl">
    {[1,2,3,4,5].map((n)=>(
      <span
        key={n}
        onClick={()=>setRating(n)}
        className="cursor-pointer"
      >
        {n <= rating ? "★" : "☆"}
      </span>
    ))}
  </div>

  {/* MESSAGE */}
  <input
    value={message}
    onChange={(e)=>setMessage(e.target.value)}
    placeholder="Write your review..."
    className="w-70 px-4 py-3 rounded-full bg-white text-black"
  />

  <button
    onClick={submitReview}
    className="w-70 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full"
  >
    Send Review
  </button>

</div>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-6 py-16">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">A&W Store</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the latest trends and timeless pieces.
            Quality fashion made for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-amber-400 cursor-pointer transition">Home</li>
            <li className="hover:text-amber-400 cursor-pointer transition">Shop</li>
            <li className="hover:text-amber-400 cursor-pointer transition">About</li>
            <li className="hover:text-amber-400 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-amber-400 cursor-pointer transition">FAQs</li>
            <li className="hover:text-amber-400 cursor-pointer transition">Shipping</li>
            <li className="hover:text-amber-400 cursor-pointer transition">Returns</li>
            <li className="hover:text-amber-400 cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-amber-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} A&W Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
