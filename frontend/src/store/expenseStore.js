import { create } from "zustand";

import api from "../services/api";

import useAuthStore from "./authStore";

const useExpenseStore = create((set) => ({

  expenses: [],

  loading: false,


  // GET EXPENSES
  fetchExpenses: async () => {

    try {

      set({ loading: true });

      const token =
        useAuthStore.getState().user?.token;

      const { data } = await api.get(
        "/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        expenses: data,
        loading: false,
      });

    } catch (error) {
      console.log(error);

      set({ loading: false });
    }
  },


  // ADD EXPENSE
  addExpense: async (expenseData) => {

    try {

      const token =
        useAuthStore.getState().user?.token;

      const { data } = await api.post(
        "/expenses",
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        expenses: [data, ...state.expenses],
      }));

    } catch (error) {
      console.log(error);
    }
  },


  // DELETE EXPENSE
  deleteExpense: async (id) => {

    try {

      const token =
        useAuthStore.getState().user?.token;

      await api.delete(
        `/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        expenses: state.expenses.filter(
          (expense) => expense._id !== id
        ),
      }));

    } catch (error) {
      console.log(error);
    }
  },

}));

export default useExpenseStore;