"use client";

import { Button } from '@/components/ui/button';
import useAuthStore from '@/Store/userStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckOut = () => {
  const router = useRouter();
  const { user, token, loading, checkAuth } = useAuthStore();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "cash",
  });

  // First useEffect: Check authentication and load cart items
  useEffect(() => {
    const initializeCheckout = async () => {
      // First check authentication
      if (!user) {
        await checkAuth();
      }
      
      // Then load cart items
      const storedItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
      console.log("Cart Items retrieved from localStorage:", storedItems);
      setCartItems(storedItems);
    };

    initializeCheckout();
  }, []); 

  // Second useEffect: Handle unauthorized access
  useEffect(() => {
    if (!loading && !user) {
      toast.error("You need to be logged in to place an order!");
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  const removeItems = (index) => {
    const updateCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updateCart);
    localStorage.setItem("checkoutItems", JSON.stringify(updateCart));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!token) {
      toast.error("Please log in to place an order");
      router.push("/auth/login");
      return;
    }

    if (!formData.name || !formData.address) {
      toast.error("Please enter your shipping details.");
      return;   
    }

    try {
      const formattedItems = cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          // Add credentials if your API is on a different domain
          credentials: 'include'
        },
        body: JSON.stringify({
          items: formattedItems,
          shippingAddress: formData.address,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error("Order failed:", data);
        throw new Error(data.message || "Checkout failed!");
      }

      toast.success("Order placed successfully!");
      localStorage.removeItem("checkoutItems");
      localStorage.removeItem("cart");

      router.push(`/Order-success/${data.order._id}`);

    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.message);
    }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 border-b">
                <p>{item.name} - ${item.price.sale || item.price.regular} x {item.quantity}</p>
                <button onClick={() => removeItems(index)} className="text-red-500">Remove</button>
              </div>
            ))}

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full p-2 border mb-2" 
              />
              <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                value={formData.address} 
                onChange={handleChange} 
                className="w-full p-2 border mb-2" 
              />

              <h2 className="text-xl font-semibold mt-4">Payment Method</h2>
              <select 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange} 
                className="w-full p-2 border mb-4"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
              </select>

              <Button 
                className="bg-primaryColor text-white w-full" 
                size="lg" 
                onClick={handleOrder}
              >
                Place Order
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOut;