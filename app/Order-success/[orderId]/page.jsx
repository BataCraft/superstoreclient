"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/order/${orderId}`, { signal });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch order details`);
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();

    return () => controller.abort();
  }, [orderId]);

  if (!orderId) {
    return <div>Invalid order ID.</div>;
  }

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Order ID: {orderId}</h1>
      {orderDetails ? (
        <div>
          <h2>Order Details</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(orderDetails, null, 2)}</pre>
        </div>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
