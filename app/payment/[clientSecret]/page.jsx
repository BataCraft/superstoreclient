"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

// Stripe publishable key - ensure this is the PUBLISHABLE key, not the secret key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Component that handles the actual payment form
const PaymentForm = ({ clientSecret }) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [cardError, setCardError] = useState(null);
  const router = useRouter();
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    setPaymentLoading(true);
    setCardError(null);

    // Get stored shipping details
    const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails") || "{}");
    const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems") || "[]");

    try {
      // Create payment method
      const cardElement = elements.getElement(CardElement);
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingDetails.name || "",
            address: {
              line1: shippingDetails.address || "",
            }
          }
        }
      });

      if (error) {
        setCardError(error.message);
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // Create the order in your system now that payment is complete
        const formattedItems = checkoutItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price.sale || item.price.regular
        }));

        const token = localStorage.getItem("token");
        
        // Save order in your database
        const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: formattedItems,
            shippingAddress: shippingDetails.address,
            customerName: shippingDetails.name,
            paymentMethod: "Stripe",
            paymentId: paymentIntent.id,
            paymentStatus: "paid"
          }),
        });

        const orderData = await orderRes.json();
        
        if (orderData.error) {
          throw new Error(orderData.error);
        }

        toast.success("Payment successful!");
        
        // Clear cart and checkout data
        localStorage.removeItem("checkoutItems");
        localStorage.removeItem("cart");
        localStorage.removeItem("shippingDetails");
        
        // Redirect to success page - improved error handling
        if (orderData.order && orderData.order._id) {
          router.push(`/Order-success/${orderData.order._id}`);
        } else {
          router.push('/Order-success/completed');
        }
      } else {
        toast.error("Payment processing failed. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Payment processing failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCardChange = (event) => {
    setCardError(event.error ? event.error.message : "");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Card Information</label>
          <div className="border rounded-md p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              onChange={handleCardChange}
            />
          </div>
          {cardError && <p className="text-red-500 text-sm mt-1">{cardError}</p>}
        </div>
        
        <Button
          className="bg-primaryColor text-white w-full"
          size="lg"
          type="submit"
          disabled={!stripe || paymentLoading}
        >
          {paymentLoading ? "Processing..." : "Pay Now"}
        </Button>
        
        <p className="text-sm text-gray-500 text-center">
          Your payment is secured by Stripe. We do not store your card details.
        </p>
      </form>
    </div>
  );
};

// Page component that retrieves the client secret
export default function PaymentPage({ params }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a client secret from the URL
    if (params?.clientSecret) {
      setClientSecret(params.clientSecret);
      setLoading(false);
    } else {
      // If no client secret is provided in the URL, redirect back to checkout
      setError("Invalid payment session");
      setTimeout(() => {
        router.push("/checkout");
      }, 3000);
    }
  }, [params, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-200 rounded max-w-md mx-auto"></div>
        </div>
        <p className="mt-4">Loading payment form...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          <p>{error}</p>
          <p className="text-sm mt-2">Redirecting to checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h1>
      
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} />
      </Elements>
      
      <div className="mt-6 text-center">
        <button 
          onClick={() => router.push("/checkout")} 
          className="text-primaryColor hover:underline"
        >
          Return to checkout
        </button>
      </div>
    </div>
  );
}