import { create } from "zustand";
import { fetchReviews, createReview, updateReview, deleteReview } from "./reviewServies"
const useReviewStore = create((set) => ({
  reviews: [],
  loading: false,
  error: null,

  // Load reviews for a specific product
  loadReviews: async (productId) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchReviews(productId); // Call fetchReviews and pass productId
      set({ reviews: data, loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to load reviews', loading: false });
    }
  },

  // Add a new review
  addReview: async (reviewData) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User is not authenticated');

      const newReview = await createReview(reviewData.productId, reviewData.rating, reviewData.comment);
      set((state) => ({ reviews: [...state.reviews, newReview.review], loading: false }));
    } catch (error) {
      set({ error: error.message || 'Failed to add review', loading: false });
    }
  },

  // Update an existing review
  updateExistingReview: async (id, updatedData) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User is not authenticated');
      const updatedReview = await updateReview(id, updatedData);
      set((state) => ({
        reviews: state.reviews.map((r) => (r._id === id ? updatedReview.review : r)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message || 'Failed to update review', loading: false });
    }
  },

  // Delete a review
  removeReview: async (id) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User is not authenticated');
      await deleteReview(id);
      set((state) => ({ reviews: state.reviews.filter((r) => r._id !== id), loading: false }));
    } catch (error) {
      set({ error: error.message || 'Failed to delete review', loading: false });
    }
  },
}));

export default useReviewStore;
