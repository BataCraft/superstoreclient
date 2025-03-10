"use client";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/Store/userStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

// Move this outside the component to avoid recreation on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckOut = () => {
  const router = useRouter();
  const { user, token, loading, checkAuth } = useAuthStore();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "COD", // Changed default to match option value
  });

  useEffect(() => {
    const initializeCheckout = async () => {
      if (!user) {
        await checkAuth();
      }
      const storedItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
      setCartItems(storedItems);
    };
    initializeCheckout();
  }, [checkAuth, user]); // Added missing dependency

  useEffect(() => {
    if (!loading && !user) {
      toast.error("You need to be logged in to place an order!");
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  const removeItems = (index) => {
    // Remove item from cartItems
    const updatedCart = cartItems.filter((_, i) => i !== index);
    
    // Update the state
    setCartItems(updatedCart);
  
    // Update localStorage to persist the change
    localStorage.setItem("checkoutItems", JSON.stringify(updatedCart));
    
    // Log to verify the change
    console.log('Updated Cart:', updatedCart);
    console.log('LocalStorage after update:', localStorage.getItem('checkoutItems'));
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStripePayment = async () => {
    try {
      // Calculate the total amount from cart items
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.price.sale || item.price.regular) * item.quantity, 
        0
      );
      
      if (totalAmount <= 0) {
        toast.error("Invalid order amount");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cartItems }),
      });
      
      const data = await res.json();
      
      if (!data.clientSecret) {
        throw new Error(data.error || "Failed to create payment intent");
      }
  
      // Store shipping details in localStorage for access after payment
      localStorage.setItem("shippingDetails", JSON.stringify({
        name: formData.name,
        address: formData.address
      }));
      
      // Redirect to payment page
      router.push(`/payment/${data.clientSecret}`);
    } catch (error) {
      toast.error(error.message || "Payment processing failed");
    }
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

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (formData.paymentMethod === "Stripe") {
      await handleStripePayment();
      return;
    }

    try {
      const formattedItems = cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price.sale || item.price.regular
      }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: formattedItems,
          shippingAddress: formData.address,
          customerName: formData.name,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await res.json();

      if (!data.order) {
        throw new Error(data.error || "Failed to create order");
      }

      toast.success("Order placed successfully!");
      localStorage.removeItem("checkoutItems");
      localStorage.removeItem("cart");

      router.push(`/Order-success/${data.order._id}`);
    } catch (error) {
      toast.error(error.message || "Failed to place order");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.price.sale || item.price.regular) * item.quantity, 
      0
    ).toFixed(2);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="mb-4">Your cart is empty.</p>
            <Button 
              onClick={() => router.push("/Product-list")} 
              className="bg-primaryColor text-white"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="border rounded-md overflow-hidden">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">${item.price.sale || item.price.regular} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-medium mr-4">
                        ${((item.price.sale || item.price.regular) * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeItems(index)} 
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>${calculateTotal()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter your full name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Shipping Address</label>
                  <textarea
                    name="address" 
                    placeholder="Enter your complete address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md" 
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <select 
                    name="paymentMethod" 
                    value={formData.paymentMethod} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="Stripe">Pay with Card (Stripe)</option>
                  </select>
                </div>

                <Button 
                  className="bg-primaryColor text-white w-full mt-6" 
                  size="lg" 
                  onClick={handleOrder}
                >
                  {formData.paymentMethod === "Stripe" ? "Proceed to Payment" : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;