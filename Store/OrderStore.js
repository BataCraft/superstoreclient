const { create } = require("zustand");
const axios = require("axios");

const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  // Fetch order by ID
  getOrderById: async (orderId) => {
    set({ loading: true, error: null });

    if (!orderId) {
      set({
        error: "Order ID is required",
        loading: false,
      });
      throw new Error("Order ID is required");
    }

    try {
      // Ensure the API URL is properly set
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      
      // Make the API request to fetch the order
      const response = await axios.get(`${apiUrl}/api/order/get-order/${orderId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging requests
        timeout: 5000,
      });

      // Check if we have valid data
      if (response.data && response.data.order) {
        set({
          currentOrder: response.data.order,
          loading: false,
        });
        return response.data.order;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to fetch order";

      set({
        error: errorMessage,
        loading: false,
      });
      
      console.error("Error fetching order details:", {
        message: errorMessage,
        status: error.response?.status,
        url: error.config?.url,
      });
      
      throw error;
    }
  },

  // Reset store state
  resetOrder: () => {
    set({
      currentOrder: null,
      error: null,
      loading: false,
    });
  },
}));

export default useOrderStore;