import { useEffect } from "react";
import Layout from "../components/Layout";

import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import useExpenseStore from "../store/expenseStore";
import useIncomeStore from "../store/incomeStore";
import useBudgetStore from "../store/budgetStore";

const Dashboard = () => {
  const {
    expenses = [],
    fetchExpenses,
  } = useExpenseStore();

  const {
    incomes = [],
    fetchIncomes,
  } = useIncomeStore();

  const {
    budgets = [],
    fetchBudgets,
  } = useBudgetStore();

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
    fetchBudgets();
  }, []);

  // Calculations
  const totalIncome = incomes.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalBudget = budgets.reduce(
    (sum, item) => sum + Number(item.limit || 0),
    0
  );

  const balance = totalIncome - totalExpenses;
  const savings = balance;

  // Recent 5 expenses
  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
   
      <DashboardLayout>
         <Layout>
        {/* HERO */}
        <div
          className="
            dashboard-hero
            bg-gradient-to-r
            from-black to-slate-800
            text-white
            p-6 sm:p-8
            rounded-3xl
            mb-8
            flex justify-between items-center
          "
        >
          <div>
            <p className="text-gray-300 mb-2">
              Welcome Back 👋
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Financial Dashboard
            </h1>

            <p className="text-gray-400">
              Track your money smarter with AI insights
            </p>
          </div>

          <div
            className="
              hidden md:flex
              items-center justify-center
              w-24 h-24
              rounded-full
              bg-white/10
            "
          >
            <TrendingUp size={42} />
          </div>
        </div>

        {/* STATS */}
        <div className="stat-cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* BALANCE */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <Wallet size={24} />
              </div>
              <ArrowUpRight className="text-green-500" />
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-1">
              Total Balance
            </p>

            <h2 className="text-3xl font-bold">
              ₹{balance}
            </h2>
          </div>

          {/* INCOME */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 rounded-2xl bg-green-100 text-green-600">
                <ArrowUpRight size={24} />
              </div>
              <span className="text-green-500 font-semibold">
                + Income
              </span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-1">
              Total Income
            </p>

            <h2 className="text-3xl font-bold text-green-500">
              ₹{totalIncome}
            </h2>
          </div>

          {/* EXPENSES */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 rounded-2xl bg-red-100 text-red-600">
                <ArrowDownRight size={24} />
              </div>
              <span className="text-red-500 font-semibold">
                - Expenses
              </span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-1">
              Total Expenses
            </p>

            <h2 className="text-3xl font-bold text-red-500">
              ₹{totalExpenses}
            </h2>
          </div>

          {/* SAVINGS */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 rounded-2xl bg-purple-100 text-purple-600">
                <PiggyBank size={24} />
              </div>
              <span className="text-purple-500 font-semibold">
                Savings
              </span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-1">
              Total Savings
            </p>

            <h2 className="text-3xl font-bold text-purple-500">
              ₹{savings}
            </h2>
          </div>
        </div>

        {/* LOWER SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* RECENT EXPENSES */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow border border-gray-100 dark:border-slate-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Recent Expenses
              </h2>

              <button className="text-sm font-semibold text-blue-500">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-800"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {expense.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {expense.category}
                      </p>
                    </div>

                    <div className="text-red-500 font-bold">
                      - ₹{expense.amount}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No expenses added yet.
                </p>
              )}
            </div>
          </div>

          {/* QUICK INSIGHTS */}
          <div
  className="
    bg-white dark:bg-slate-900
    rounded-3xl shadow
    border border-gray-100 dark:border-slate-800
    p-6
  "
>
  <h2 className="text-2xl font-bold mb-6">
    Quick Insights
  </h2>

  <div className="space-y-5">
    {/* Positive Savings */}
    <div
      className="
        bg-green-100 dark:bg-green-900/30
        p-4 rounded-2xl
      "
    >
      <p className="font-semibold text-green-700 dark:text-green-400">
        Positive Savings
      </p>

      <p className="text-sm mt-1">
        {savings >= 0
          ? "You are maintaining a healthy savings rate."
          : "Your expenses are exceeding your income. Consider reducing discretionary spending."}
      </p>
    </div>

    {/* Expense Monitoring */}
    <div
      className="
        bg-red-100 dark:bg-red-900/30
        p-4 rounded-2xl
      "
    >
      <p className="font-semibold text-red-700 dark:text-red-400">
        Expense Monitoring
      </p>

      <p className="text-sm mt-1">
        {totalExpenses > totalIncome * 0.8
          ? "Your expenses are approaching your income limit. Monitor non-essential purchases."
          : "Your spending is under control. Continue tracking unnecessary purchases."}
      </p>
    </div>

    {/* AI Recommendations */}
    <div
      className="
        bg-blue-100 dark:bg-blue-900/30
        p-4 rounded-2xl
      "
    >
      <p className="font-semibold text-blue-700 dark:text-blue-400">
        AI Recommendations
      </p>

      <p className="text-sm mt-1">
        {savings > 0
          ? "Use AI insights regularly to identify opportunities to save and invest more effectively."
          : "Generate AI insights to receive personalized recommendations for improving your financial health."}
      </p>
    </div>
  </div>
</div>
        </div>
         </Layout>
      </DashboardLayout>
   
  );
};

export default Dashboard;