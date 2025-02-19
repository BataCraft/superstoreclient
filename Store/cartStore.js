import { create } from "zustand";
import Cookies from "js-cookie";

const useCartStore = create((set) => ({
  cartItems: JSON.parse(Cookies.get("cart") || "[]"),
  
  addToCart: (item) =>
    set((state) => {
      const updatedCart = [...state.cartItems, item];
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cartItems.filter((item) => item.id !== id);
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    }),

  clearCart: () => {
    Cookies.remove("cart");
    set({ cartItems: [] });
  },
}));

export default useCartStore;
