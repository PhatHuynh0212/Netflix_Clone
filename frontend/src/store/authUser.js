import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSignUp: false,
  isLogIn: false,
  isLogOut: false,
  isCheckAuth: true,
  signup: async (credentials) => {
    set({ isSignUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSignUp: false });
      toast.success("Account created successful");
    } catch (error) {
      set({ user: null, isSignUp: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  login: async (credentials) => {
    set({ isLogIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLogIn: false });
      toast.success("Logged in successful");
    } catch (error) {
      set({ isLogIn: false });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout: async () => {
    set({ isLogOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLogOut: false });
      toast.success("Logged out successful");
    } catch (error) {
      set({ isLogOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckAuth: false });
    } catch (error) {
      set({ isCheckAuth: false, user: null });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
