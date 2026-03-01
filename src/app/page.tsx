"use client";
import Customers from "../components/section/Customers";
import Hero from "../components/section/Hero";
import Products from "../components/section/Products";
import { useEffect, useState } from "react";
// import Api from '@/app/api/products/route'
import { useCart } from "../lib/CartContext";
import { typeProduct } from "../lib/type";

export default function Home() {
  const [products, setProducts] = useState<typeProduct[]>([]);
  
 

  useEffect(() => {
    const fetchProducts = async () => {
      
      try {
        const res = await fetch("/api/products"); 

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <>
      <Hero />

{products[0] && (
  <Products products={products.slice(0,4)} titlename="NEW ARRIVALS" />
)}
      {products.slice(4,8).length > 0 && (
        <Products products={products.slice(4, 8)} titlename={"TOP SELLING"} />
      )}

      <Customers/>
    </>
  );
}
