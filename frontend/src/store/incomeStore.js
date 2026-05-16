import { create } from "zustand";

import api from "../services/api";
import useAuthStore from "./authStore";

const useIncomeStore = create((set) => ({
  // STATE
  incomes: [],
  loading: false,
  error: null,

  // FETCH ALL INCOMES
  fetchIncomes: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const token =
        useAuthStore.getState().user?.token;

      const { data } = await api.get(
        "/income",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        incomes: data,
        loading: false,
      });
    } catch (error) {
      console.log(error);

      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // ADD INCOME
  addIncome: async (incomeData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const token =
        useAuthStore.getState().user?.token;

      const { data } = await api.post(
        "/income",
        incomeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        incomes: [
          data,
          ...state.incomes,
        ],
        loading: false,
      }));
    } catch (error) {
      console.log(error);

      set({
        error: error.message,
        loading: false,
      });
    }
  },

  // DELETE INCOME
  deleteIncome: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const token =
        useAuthStore.getState().user?.token;

      await api.delete(
        `/income/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        incomes:
          state.incomes.filter(
            (item) =>
              item._id !== id
          ),
        loading: false,
      }));
    } catch (error) {
      console.log(error);

      set({
        error: error.message,
        loading: false,
      });
    }
  },
}));

export default useIncomeStore;