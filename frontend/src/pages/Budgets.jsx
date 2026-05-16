import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Layout from "../components/Layout";

import useBudgetStore from "../store/budgetStore";
import useExpenseStore from "../store/expenseStore";

const Budgets = () => {
  const {
    budgets = [],
    fetchBudgets,
    createBudget,
    deleteBudget,
  } = useBudgetStore();

  const {
    fetchExpenses,
  } = useExpenseStore();

  const currentMonth =
    new Date().toISOString().slice(0, 7);

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    month: currentMonth,
  });

  // Month filter state
  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth);

  // Load latest expenses and budgets
  useEffect(() => {
    const loadData = async () => {
      await fetchExpenses();
      await fetchBudgets();
    };

    loadData();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create budget
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBudget({
      ...formData,
      limit: Number(formData.limit),
    });

    await fetchBudgets();

    // Automatically switch to the month for which the budget was created
    setSelectedMonth(formData.month);

    // Reset form
    setFormData({
      category: "",
      limit: "",
      month: currentMonth,
    });
  };

  // Format YYYY-MM → "May 2026"
  const formatMonth = (month) => {
    const date = new Date(`${month}-01`);

    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  // Calculate percentage used
  const getUsagePercentage = (spent, limit) => {
    if (!limit || Number(limit) === 0) {
      return 0;
    }

    const percentage =
      (Number(spent || 0) / Number(limit)) * 100;

    return Math.min(percentage, 100);
  };

  // Show budgets only for selected month
  const filteredBudgets = budgets.filter(
    (budget) =>
      String(budget.month) === selectedMonth
  );

  return (
  
      <DashboardLayout>
          <Layout>
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Budgets
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              Set monthly budgets and control your spending.
            </p>
          </div>
        </div>

        {/* MONTH FILTER */}
       

        {/* CREATE BUDGET FORM */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              type="number"
              name="limit"
              placeholder="Budget Limit"
              value={formData.limit}
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
              type="month"
              name="month"
              value={formData.month}
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
            Save Budget
          </button>
        </form>
         <div
          className="
            bg-white dark:bg-slate-900
            p-4 sm:p-5
            rounded-2xl
            shadow
            mb-6
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              View Budgets For
            </label>

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value
                )
              }
              className="
                border p-3 rounded-xl
                bg-white dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
                w-full sm:w-auto
              "
            />
          </div>
        </div>
        {/* BUDGET CARDS */}
        {filteredBudgets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBudgets.map((budget) => {
              const spent = Number(
                budget.spent || 0
              );

              const percentage =
                getUsagePercentage(
                  spent,
                  budget.limit
                );

              return (
                <div
                  key={budget._id}
                  className="
                    bg-white dark:bg-slate-900
                    p-5 sm:p-6
                    rounded-2xl
                    shadow
                    border border-gray-100
                    dark:border-slate-800
                  "
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">
                        {budget.category
                          .charAt(0)
                          .toUpperCase() +
                          budget.category.slice(
                            1
                          )}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatMonth(
                          budget.month
                        )}
                      </p>
                    </div>

                    <button
                      onClick={async () => {
                        await deleteBudget(
                          budget._id
                        );
                        await fetchBudgets();
                      }}
                      className="
                        text-red-500
                        hover:text-red-600
                        font-medium
                        text-sm
                      "
                    >
                      Delete
                    </button>
                  </div>

                  {/* Limit */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Budget Limit
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      ₹{budget.limit}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span>
                        Spent: ₹{spent}
                      </span>
                      <span>
                        {percentage.toFixed(
                          0
                        )}
                        %
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percentage >= 100
                            ? "bg-red-500"
                            : percentage >= 80
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <p
                    className={`text-sm font-medium ${
                      percentage >= 100
                        ? "text-red-500"
                        : percentage >= 80
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {percentage >= 100
                      ? "Budget Exceeded"
                      : percentage >= 80
                      ? "Approaching Limit"
                      : "Within Budget"}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div
            className="
              bg-white dark:bg-slate-900
              p-8
              rounded-2xl
              shadow
              text-center
              text-gray-500 dark:text-gray-400
            "
          >
            No budgets found for the selected month.
          </div>
        )}
         </Layout>
      </DashboardLayout>
   
  );
};

export default Budgets;