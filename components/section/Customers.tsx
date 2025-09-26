import React from "react";
import Marquee from "react-fast-marquee";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const reviews = [
  {
    title: "Sarah M.",
    describetion:
      "I'm blown away by the quality and style of the clothes I received from A&W store From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    title: "Alex K.",
    describetion:
      "Finding clothes that align with my personal style used to be a challenge until I discovered A&W store The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    title: "James L.",
    describetion:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon A&W store The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    title: "Mohamed M.",
    describetion:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon A&W store The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

const Customers = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16">
      <h2 className="text-center text-4xl font-extrabold text-white mb-10">
        What Our Customers Say
      </h2>

      <Marquee gradient={true}    gradientColor="black"  gradientWidth={100} speed={50} pauseOnHover={true}>
        {reviews.map((r, index) => (
          <div
            key={index}
            className="w-80 mx-4 p-6 rounded-2xl bg-gray-800 shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300 flex flex-col gap-4"
          >
            {/* Rating */}
            <div className="flex items-center gap-1 text-amber-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-lg">{r.title}</h3>
              <FaCheckCircle className="text-amber-500" />
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">{r.describetion}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Customers;
