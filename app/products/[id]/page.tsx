"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
 import { Niconne } from 'next/font/google';
import Image from 'next/image';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { useCart } from "@/lib/usecart";
import {typeProduct} from '@/lib/type'

interface Product {
  sizes: any;
  colors: any;
  discount: number;
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
 // add anything  
}

const Page = ({ productToCart }: { productToCart: typeProduct }) => {
    const {id} = useParams();
    const [product , setProduct] =useState<Product | null>(null)
    //add to cart 
    const {addToCart} = useCart()

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                const res = await fetch('/api/products')
                const data:Product[] = await res.json()
                if(!res.ok) throw new Error("faild fetch products")

                //products details 
                const found = data.find((item)=> item.id === parseInt(id as string))
                setProduct(found || null);
            } catch (error) {
             console.error("Error fetching products:" , error);    
            } 
        };
        
        if(id) fetchProducts();
    },[id])

    if(!product){
        return <p>Loading...</p>
    }

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* image product*/}
        <div className="w-full h-[400px] relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold">{product.title}</h1>
          <p className="text-gray-300">{product.description}</p>

          {/* rating */}
          <div className="flex items-center gap-1 text-amber-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
            <span className="ml-2 text-sm text-gray-400">(120 reviews)</span>
          </div>

          {/* price and discount*/}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.discount > 0 && (
              <span className="line-through text-gray-400">
                ${product.discount}
              </span>
            )}
          </div>

          {/* color */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Colors:</h3>
            <div className="flex gap-3">
              {product.colors.map((color: any, idx: React.Key | null | undefined) => (
                <span
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-gray-500 cursor-pointer"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>

          {/* sizes*/}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sizes:</h3>
            <div className="flex gap-3">
              {product.sizes.map((size : any , idx:  React.Key | null | undefined) => (
                <span
                  key={idx}
                  className="px-4 py-2 border border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/*add  to cart*/}
          <button onClick={()=> addToCart(productToCart)} className="mt-6 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold shadow-lg transition-all">
             Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

