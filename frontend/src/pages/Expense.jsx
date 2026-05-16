import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Layout from "../components/Layout";

import useExpenseStore from "../store/expenseStore";

const Expenses = () => {
  const {
    expenses,
    fetchExpenses,
    addExpense,
    deleteExpense,
  } = useExpenseStore();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addExpense({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
    });
  };

  return (
    
      <DashboardLayout>
        <Layout>
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Expenses
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              Manage and track all your expenses.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white dark:bg-slate-900
            p-4 sm:p-5 lg:p-6
            rounded-2xl
            shadow
            mb-8
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
                border p-3 rounded-xl
                bg-white dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
                w-full
              "
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="
                border p-3 rounded-xl
                bg-white dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
                w-full
              "
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="
                border p-3 rounded-xl
                bg-white dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
                w-full
              "
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="
                border p-3 rounded-xl
                bg-white dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
                w-full
              "
            />
          </div>

          <button
            type="submit"
            className="
              mt-4
              w-full sm:w-auto
              bg-black text-white
              px-6 py-3
              rounded-xl
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Add Expense
          </button>
        </form>

        {/* EXPENSE LIST */}
        <div
          className="
            bg-white dark:bg-slate-900
            p-4 sm:p-5 lg:p-6
            rounded-2xl
            shadow
          "
        >
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-slate-800 rounded-xl">
                <tr>
                  <th className="p-3 text-left">
                    Title
                  </th>
                  <th className="p-3 text-left">
                    Amount
                  </th>
                  <th className="p-3 text-left">
                    Category
                  </th>
                  <th className="p-3 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="border-b dark:border-slate-800"
                  >
                    <td className="p-3">
                      {expense.title}
                    </td>

                    <td className="p-3 font-semibold">
                      ₹{expense.amount}
                    </td>

                    <td className="p-3">
                      {expense.category}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          deleteExpense(
                            expense._id
                          )
                        }
                        className="
                          bg-red-500 text-white
                          px-3 py-1
                          rounded-lg
                          hover:bg-red-600
                          transition
                        "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile + Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="
                  border border-gray-200
                  dark:border-slate-700
                  rounded-xl
                  p-4
                  bg-gray-50
                  dark:bg-slate-800
                "
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {expense.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {expense.category}
                    </p>
                  </div>

                  <span className="font-bold text-lg">
                    ₹{expense.amount}
                  </span>
                </div>

                {expense.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {expense.description}
                  </p>
                )}

                <button
                  onClick={() =>
                    deleteExpense(expense._id)
                  }
                  className="
                    w-full sm:w-auto
                    bg-red-500 text-white
                    px-4 py-2
                    rounded-lg
                    hover:bg-red-600
                    transition
                  "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {expenses.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No expenses added yet.
            </div>
          )}
        </div>
        </Layout>
      </DashboardLayout>
    
  );
};

export default Expenses;