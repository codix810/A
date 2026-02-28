"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const Customers = () => {
  const [reviews, setReviews]: any = useState([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(setReviews);
  }, []);

  const Stars = ({ count }: any) => (
    <div className="flex items-center gap-1 text-amber-400">
      {[1, 2, 3, 4, 5].map((n) => (
        <FaStar key={n} opacity={n <= count ? 1 : 0.2} />
      ))}
    </div>
  );

  const Card = ({ r }: any) => (
    <div className="w-80 m-4 p-6 rounded-2xl bg-gray-800 shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300 flex flex-col gap-4">

      {/* Rating */}
      <Stars count={r.rating} />

      {/* User */}
      <div className="flex items-center gap-2">
        <h3 className="text-white font-semibold text-lg">
          {r.name || "Customer"}
        </h3>
        <FaCheckCircle className="text-amber-500" />
      </div>

      {/* Message */}
      <p className="text-gray-300 text-sm leading-relaxed">
        {r.message}
      </p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16">

      <h2 className="text-center text-4xl font-extrabold text-white mb-10">
        What Our Customers Say
      </h2>

      <Marquee
        gradient
        gradientColor="black"
        gradientWidth={100}
        speed={50}
        pauseOnHover
      >
        {reviews.map((r: any) => (
          <Card key={r._id} r={r} />
        ))}
      </Marquee>

      <Marquee
        gradient
        direction="right"
        gradientColor="black"
        gradientWidth={100}
        speed={50}
        pauseOnHover
      >
        {reviews.map((r: any) => (
          <Card key={r._id + "2"} r={r} />
        ))}
      </Marquee>

    </div>
  );
};

export default Customers;