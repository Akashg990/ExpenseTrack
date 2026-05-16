import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,

  // Register
  register: async (formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await api.post(
        "/users/register",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      set({
        user: data,
        loading: false,
      });

      return true;
    } catch (error) {
      console.log("Register Error:", error.response?.data);

      set({
        error:
          error.response?.data?.message ||
          "Registration failed",
        loading: false,
      });

      return false;
    }
  },

  // Login
  login: async (formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await api.post(
        "/users/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      set({
        user: data,
        loading: false,
      });

      return true;
    } catch (error) {
      console.log("Login Error:", error.response?.data);

      set({
        error:
          error.response?.data?.message ||
          "Login failed",
        loading: false,
      });

      return false;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("user");

    set({
      user: null,
      error: null,
    });
  },
}));

export default useAuthStore;