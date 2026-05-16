import { create } from "zustand";

import api from "../services/api";

import useAuthStore from "./authStore";

const useBudgetStore = create((set) => ({

  budgets: [],


  fetchBudgets: async () => {

    try {

      const token =
        useAuthStore.getState().user?.token;

      const { data } = await api.get(
        "/budgets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        budgets: data,
      });

    } catch (error) {
      console.log(error);
    }
  },


  createBudget: async (budgetData) => {

    try {

      const token =
        useAuthStore.getState().user?.token;

      const { data } = await api.post(
        "/budgets",
        budgetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        budgets: [data, ...state.budgets],
      }));

    } catch (error) {
      console.log(error);
    }
  },


  deleteBudget: async (id) => {

    try {

      const token =
        useAuthStore.getState().user?.token;

      await api.delete(
        `/budgets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        budgets: state.budgets.filter(
          (budget) => budget._id !== id
        ),
      }));

    } catch (error) {
      console.log(error);
    }
  },

}));

export default useBudgetStore;