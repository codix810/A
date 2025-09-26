import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

const Button = () => {
   const usepath = usePathname();
    const nopath =["/products"];
    const notshowprodects = !nopath.includes(usepath);
  return (
    <>
      {notshowprodects && (
        <div className='flex justify-center items-center py-20 '>
          <button className='border-amber-50 px-6 py-3 text-white font-bold border-2 rounded-full hover:bg-white hover:text-black duration-300  '>
              <Link href={'/products'}>
              View More
              </Link>
          </button>
      </div>
      )}
    </>
  );
}

export default Button