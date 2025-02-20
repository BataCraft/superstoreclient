"use client"
import { usePathname } from "next/navigation"
import Header from "./Header";
import Footer from "./_Footer/Page";

export default function NavigationWrapper({children}) {
    const pathname = usePathname();
    
    // Using includes() for more flexible path matching
    const isAuthPage = pathname?.includes('/auth/login') || pathname?.includes('/auth/register') || pathname?.includes('/auth/emailverify');
    
    return (
        <div suppressHydrationWarning className="flex flex-col justify-between min-h-screen">
            {!isAuthPage && <Header/>}
            {children}
            {!isAuthPage && <Footer/>}
        </div>
    )
}