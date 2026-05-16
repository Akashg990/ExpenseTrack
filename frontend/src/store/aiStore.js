import { create } from "zustand";

import api from "../services/api";

import useAuthStore from "./authStore";

const useAIStore = create((set) => ({

  insights: "",

  loading: false,


  generateInsights: async () => {

    try {

      set({
        loading: true,
      });

      const token =
        useAuthStore.getState().user?.token;

      const { data } = await api.get(
        "/ai/insights",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        insights: data.insights,
        loading: false,
      });

    } catch (error) {

      console.log(error);

      set({
        insights:
          error.response?.data?.message ||
          "AI service unavailable.",
        loading: false,
      });
    }
  },

}));

export default useAIStore;