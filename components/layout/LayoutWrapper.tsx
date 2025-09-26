"use client"

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";


function LayoutWrapper({children }:{children :React.ReactNode}) {
    const pathname = usePathname();
    const nolayoutpage =[ "/signin" ,"/signup"]
    const showLayout = !nolayoutpage.includes(pathname)

    return(
        <>
        {showLayout && <NavBar/>}
          <main>{children}</main>
        {showLayout && <Footer/>}
        </>
    );
    
}

export default LayoutWrapper