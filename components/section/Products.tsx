import Image from "next/image";
import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import Button from "../ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
// add to cart 
import { useCart } from "@/lib/usecart";
import {typeProduct} from '@/lib/type'


type Product  ={
    id: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    gender: string;
    colors: string[];
    sizes: string[];
    image: string;
    
}
type ProductsProps ={
    products:Product[];
    titlename: string;
    productToCart: typeProduct;
}


const Products = ({products,titlename ,productToCart  }:ProductsProps ) => {
  

    const {addToCart} = useCart();
    // const [{   price, category , image}] = products;
  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-gray-00 to-black pb-10 ">
        <h2 className="text-center text-white text-5xl font-extrabold py-12">{titlename}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  place-items-center">
            {/* Card */}
        {products.map((product )=>(  
            <Link key={product.id} href={`/products/${product.id}`}>
                <div  className="group relative w-72 bg-gray-00 hover:shadow-gray-300  rounded-2xl shadow-lg  overflow-hidden border border-gray-700  hover:scale-105 transition-all duration-300">
                    
                    {/* Product Image */}
                    <div className="relative w-full h-52 overflow-hidden">
                    <Image
                        src={product.image}
                        alt="t-shirt"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    SALE
                    </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col gap-3">
                    {/* Title */}
                    <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {product.title}
                    
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-amber-400">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalf />
                        <span className="ml-2 text-sm text-gray-400">(120 reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-white">${product.price}</p>
                        <button onClick={()=>addToCart(productToCart)} className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300">
                         Add to Cart 🛒
                        </button>
                    </div>
                    </div>
                </div>
            </Link>          
        ))}
       </div>
       <Button/>
    </div>
  );
};

export default Products;
