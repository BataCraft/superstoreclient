"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const router = useRouter();

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Ensure we are on the client side before accessing localStorage
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!orderId || !token) return; // Wait until the token is set

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get-order/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal,
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
          } else if (response.status === 404) {
            throw new Error("Order not found.");
          } else {
            throw new Error(`Error ${response.status}: Failed to fetch order details`);
          }
        }

        const data = await response.json();
        setOrderDetails(data.order);
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
  }, [orderId, token]);

  if (!orderId) {
    return <div>Invalid order ID.</div>;
  }

  if (!token) {
    return (
      <div className="text-red-500">
        Authentication error. Please <button onClick={() => router.push("/login")} className="text-blue-500 underline">log in</button> and try again.
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="p-6 max-w-2xl mx-auto bg-red-50 text-red-500 shadow-md rounded-lg">{error}</div>;
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold mb-2">Order Confirmation</h1>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Order ID: {orderId}</span>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 ${
              orderDetails?.status === 'delivered' ? 'bg-green-100 text-green-800' :
              orderDetails?.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
              orderDetails?.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
              orderDetails?.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            } rounded-full text-sm font-medium`}>
              {orderDetails?.status ? orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1) : "Processing"}
            </span>
          </div>
        </div>
      </div>

      {orderDetails ? (
        <div className="space-y-6">
          {/* Order Date */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Details</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">Order Date:</span> {formatDate(orderDetails.orderDate)}</p>
              {orderDetails.trackingNumber && (
                <p><span className="font-medium">Tracking Number:</span> {orderDetails.trackingNumber}</p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>{orderDetails.shippingAddress}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Items</h2>
            {orderDetails.items && orderDetails.items.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderDetails.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.product?.name || `Product ${index + 1}`}
                              </div>
                              {item.product?._id && (
                                <div className="text-sm text-gray-500">ID: {item.product._id}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No items found in this order.</p>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>${(orderDetails.totalPrice - orderDetails.shippingCost).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping:</span>
                <span>${orderDetails.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold border-t mt-2 pt-2">
                <span>Total:</span>
                <span>${orderDetails.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Payment Information</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {orderDetails.paymentMethod === "cash" ? "Cash on Delivery" : 
                 orderDetails.paymentMethod === "card" ? "Credit/Debit Card" : 
                 orderDetails.paymentMethod === "Stripe" ? "Stripe" : "N/A"}
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  orderDetails.paymentStatus === "paid" ? "bg-green-100 text-green-800" :
                  orderDetails.paymentStatus === "failed" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {orderDetails.paymentStatus.charAt(0).toUpperCase() + orderDetails.paymentStatus.slice(1)}
                </span>
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          {orderDetails.notes && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Additional Notes</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{orderDetails.notes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button 
              onClick={() => window.print()} 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Print Receipt
            </button>
            <button 
              onClick={() => router.push("/")} 
              className="px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-primaryColor/70 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No order details found.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;