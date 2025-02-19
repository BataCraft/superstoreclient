"use client";
import { ShoppingBag } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import CartItems from "./CartItems";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

const NavCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        setCartItems(JSON.parse(storedCart));
    }
}, []);


  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Calculate total items in cart

  return (
    <div>
      <Menubar className="border-none bg-transparent ">
        <MenubarMenu>
          <MenubarTrigger className="relative border-none cursor-pointer outline-none p-0">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute top-[-5px] right-[-5px] bg-[#df4949] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems} {/* Display total items in cart */}
            </span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {!cartItems || cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                <div className="flex flex-col gap-8 items-center bg-black py-8">
                  <div className="flex items-center justify-center flex-col gap-2 bg-black">
                    <CartItems cartItems={cartItems} /> {/* Pass cartItems as a prop */}
                  </div>

                  

              
                </div>
              )}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavCart;
