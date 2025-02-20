'use client'
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartItems = ({ cartItems }) => {
  const router = useRouter();
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }


    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    console.log("Saving to localStorage:", cartItems);


   router.push("/checkout");
   
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price.sale || item.price.regular)  * item.quantity,
    0
  ); // Calculate total amount

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {/* Check if cart is empty */}
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        cartItems.map((item, index) => (
          <div className="flex bg-white text-black items-center justify-between p-4 border-b" key={index}>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="object-cover"
            />
            <div className="w-1/2 p-4">
              <p className="font-medium">{item.name}</p>
              <p>${item.price.sale ? item.price.sale : item.price.regular}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="flex flex-col justify-between">
            <p className="font-semibold">
                ${(item.price.sale || item.price.regular) * item.quantity}
              </p>
            </div>
          </div>
        ))
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <Button className="bg-primaryColor text-white" size="lg" onClick={handleCheckout} >
          Proceed to Checkout
            
          </Button>
        </div>
      )}

      {/* Total Amount */}
      {cartItems.length > 0 && (
        <div className="mt-4 text-xl font-semibold">
          Total: <span>${totalAmount.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default CartItems;
