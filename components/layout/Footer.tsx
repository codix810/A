import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto text-center flex flex-col md:flex-row items-center justify-between bg-black rounded-2xl shadow-lg p-10 -mt-24">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
          STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-70  px-4 py-3 rounded-full outline-none bg-white text-gray-900"
          />
          <button className="w-70 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full  transition">
            Subscribe
          </button>
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
