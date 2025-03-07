"use client";
import { ShoppingBag } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import CartItems from "./CartItems";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NavCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Function to load cart items from localStorage
  const loadCartItems = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  };

  // Load cart items on initial mount
  useEffect(() => {
    loadCartItems();
    
    // Add event listener for storage changes (when cart is updated in another tab)
    window.addEventListener("storage", loadCartItems);
    
    // Add event listener for custom cart update events from other components
    window.addEventListener("cartUpdated", loadCartItems);
    
    return () => {
      window.removeEventListener("storage", loadCartItems);
      window.removeEventListener("cartUpdated", loadCartItems);
    };
  }, []);

  // Calculate total items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Function to navigate to checkout
  const handleCheckout = () => {
    router.push("/checkout");
    setIsOpen(false);
  };

  // Function to navigate to cart page
  const viewCart = () => {
    router.push("/cart");
    setIsOpen(false);
  };

  return (
    <div>
      <Menubar className="border-none bg-white">
        <MenubarMenu>
          <MenubarTrigger 
            className="relative border-none cursor-pointer outline-none p-0"
            onClick={() => {
              // Refresh cart items when menu is opened
              loadCartItems();
              setIsOpen(true);
            }}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-[#df4949] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </MenubarTrigger>
          <MenubarContent 
            align="end" 
            forceMount={isOpen}
            onInteractOutside={() => setIsOpen(false)}
          >
            <MenubarItem className="bg-white">
              {!cartItems || cartItems.length === 0 ? (
                <div className="p-4 text-center">Your cart is empty</div>
              ) : (
                <div className="flex flex-col gap-4 items-center p-4 max-h-[70vh] overflow-auto" style={{ minWidth: "300px" }}>
                  <h3 className="font-semibold">Your Cart ({totalItems} items)</h3>
                  
                  <div className="w-full">
                    <CartItems cartItems={cartItems} />
                  </div>

                  {/* <div className="mt-2 flex flex-col w-full gap-2">
                    <div className="flex justify-between font-semibold">
                      <span>Subtotal:</span>
                      <span>${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                    
                    <button 
                      onClick={viewCart}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition-colors"
                    >
                      View Cart
                    </button>
                    
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded transition-colors"
                    >
                      Checkout
                    </button>
                  </div> */}
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