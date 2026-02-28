"use client"

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { CartProvider } from "../../lib/CartContext";



function LayoutWrapper({children }:{children :React.ReactNode}) {
    const pathname = usePathname();
    const nolayoutpage =[ "/signin" ,"/signup"]
    const showLayout = !nolayoutpage.includes(pathname)

    return(
        <>
          <CartProvider>
            {showLayout && <NavBar/>}
              {children}
            {showLayout && <Footer/>}
          </CartProvider>       
        </>
    );
    
}

export default LayoutWrapper