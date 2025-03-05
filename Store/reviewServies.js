import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to get the token from localStorage (for client-side authentication)
const getAuthConfig = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  }
  return {};
};

// Create review function (POST request)
export const createReview = async (productId, rating, comment) => {
  try {
    if (!rating || !comment || !productId) {
      throw new Error("Rating, comment, and product ID are required");
    }

    const response = await axios.post(
      `${API_URL}/api/review/product/${productId}/reviews`,
      { rating, comment },
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review");
  }
};

// Fetch reviews for a specific product (GET request)
export const fetchReviews = async (productId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/review/product/${productId}/reviews`, 
      getAuthConfig()
    );
    return response.data.reviews; 
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
};

// Update review function (PUT request)
export const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/review/reviews/${reviewId}`,
      updatedData,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error("Failed to update review");
  }
};

// Delete review function (DELETE request)
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/review/reviews/${reviewId}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error("Failed to delete review");
  }
};
