import toast from "react-hot-toast";

const { default: axios } = require("axios");
const { create } = require("zustand");

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  /**
   * Login user with email and password.
   * @param {string} email User email address.
   * @param {string} password User password.
   * @returns {boolean} True if login is successful, false otherwise.
   */
  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        set({
          user,
          token,
          loading: false,
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token); // Save to localStorage only on the client side
        }
        return true;
      }
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Login failed",
      });
      console.error("Login error:", error);
    }
  },

  /**
   * Check if the user is authenticated by verifying the token in localStorage.
   * @returns {User|Null} The user object if authenticated, null otherwise.
   */
  checkAuth: async () => {
    set({
      loading: true,
      error: null,
    });
    
    // Check for the token in localStorage, only on the client-side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        set({
          user: null,
          token: null,
          loading: false,
        });
        return null;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-user`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const user = response.data.user;

          set({ user: response.data.user, token });
          return response.data.user;
        }
      } catch (error) {
        set({
          loading: false,
          error: error.response?.data?.message || "Authentication failed",
        });
        console.error("Authentication error:", error);
      } finally {
        set({ loading: false });
      }
    }
  },

  logout: async ()=>{
    set({user: null, token:null});

    localStorage.removeItem("token");
    localStorage.removeItem("cart");

  },
  
  updateUser: async ({ userId, updatedData }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
      if (!token) {
        throw new Error("User is not authenticated");
      }
  
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/updateUser/${userId}`,
        updatedData, // <-- Include updated data in request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
  
      set({ user: res.data.user }); // Update store with new user data
      toast.success("Profile updated successfully!");
      return res.data;
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error.response?.data || error.message;
    }
  },
  

  registerUser: async (email, password, phoneNumber, name) => {
    set({ loading: true, error: null });
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        { email, name, password, phoneNumber },  // Match backend parameter order
        { 
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
  
      if (response.data.success) {
        toast.success("Registration successful! Please check your email for verification");
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
      set({ error: errorMessage });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  emailVerify: async (email, code) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email verification failed!");
      }

      toast.success("Email Verified Successfully!");

      set({ loading: false, error: null });

      return data; // Optionally return data if needed in the frontend

    } catch (error) {
      toast.error(error.message);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAuthStore;
