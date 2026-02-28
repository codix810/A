"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { GrCart } from 'react-icons/gr'
import { LiaUserCircleSolid } from 'react-icons/lia'
import { FiSearch } from "react-icons/fi"
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useCart } from '../../lib/CartContext'


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {cart}: any  = useCart();
  const cartCount :number = cart.length;

  const links = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/products" },
    { title: "Offers", link: "/offers" },
    { title: "Contact Us", link: "/contact" },
    { title: "Man", link: "/man" },
    { title: "Women", link: "/women" },
  ];

  return (
    <div className="w-full relative">
      {/* الشريط الأسود */}
      <div className="bg-black z-50 relative">
        <p className="text-white text-center text-sm py-3">
          sign up and get 20% off to your first order{" "}
          <Link className="font-medium underline" href={"/register"}>
            Sign Up
          </Link>
        </p>
      </div>

      {/* الناف بار */}
      <div className="flex items-center justify-around text-black py-4 px-4 shadow-xl relative z-50 bg-white">
        {/* logo & links */}
        <div className="flex gap-9">
          {/* logo */}
          <div className="flex items-center justify-center">
            <p className="text-black font-extrabold text-3xl">
              <Link href={"/"}>
                A&W<span className="text-sm">Store</span>
              </Link>
            </p>
          </div>

          {/* links desktop */}
          <div className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center justify-center gap-3">
              {links.map((link, i) => (
                <Link key={i} href={link.link}>
                  <li className="text-sm font-semibold hover:text-gray-500 duration-150">
                    {link.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* search + icons */}
        <div className="text-black w-full max-w-lg flex items-center justify-center gap-3">
          {/* input */}
          <div className="relative w-full">
            <input
              type="text"
              name="search"
              placeholder="Search products"
              className="w-full pl-10 pr-4 py-2 hidden md:flex border-2 border-gray-700 rounded-full focus:outline-none focus:border-black transition duration-200"
            />
            <FiSearch
              className="absolute right-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>

          {/* icons */} 
          <div className="flex gap-3">
           <Link href="/cart">
              <div className='relative cursor-pointer'>
                <GrCart size={20} />              
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.3 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/profile">
              <LiaUserCircleSolid size={22} />
            </Link>
          </div>

          {/* menu button */}
          {isMenuOpen ? (
            <HiX
              size={28}
              className="text-black flex items-center z-[100] lg:hidden justify-center cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <HiMenuAlt3
              size={28}
              className="text-black flex lg:hidden items-center justify-center cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* المينيو الموبايل */}
      {isMenuOpen && (
        <div className="flex flex-col w-full lg:hidden  items-center justify-center bg-white shadow-md rounded-lg absolute top-[110px] left-0 z-40">
          <ul className="flex flex-col items-center justify-center gap-4 py-6">
            {links.map((link, i) => (
              <li onClick={() => setIsMenuOpen(false)} key={i}>
                <Link
                  href={link.link}
                  className="text-sm font-semibold text-gray-800 hover:text-black hover:underline transition duration-150"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavBar
