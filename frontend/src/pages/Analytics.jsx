import Layout from "../components/Layout";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import useExpenseStore from "../store/expenseStore";
import useIncomeStore from "../store/incomeStore";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#f97316",
];

const Analytics = () => {
  const {
    expenses = [],
  } = useExpenseStore();

  const {
    incomes = [],
  } = useIncomeStore();

  // Expense category breakdown
  const expenseByCategory = expenses.reduce(
    (acc, expense) => {
      const category =
        expense.category || "Other";

      const existing =
        acc.find(
          (item) =>
            item.name === category
        );

      if (existing) {
        existing.value += Number(
          expense.amount || 0
        );
      } else {
        acc.push({
          name: category,
          value: Number(
            expense.amount || 0
          ),
        });
      }

      return acc;
    },
    []
  );

  // Monthly income vs expenses
  const monthlyData = {};

  incomes.forEach((income) => {
    const date = new Date(
      income.createdAt
    );

    const month =
      date.toLocaleString("default", {
        month: "short",
      });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expenses: 0,
      };
    }

    monthlyData[month].income += Number(
      income.amount || 0
    );
  });

  expenses.forEach((expense) => {
    const date = new Date(
      expense.createdAt
    );

    const month =
      date.toLocaleString("default", {
        month: "short",
      });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expenses: 0,
      };
    }

    monthlyData[month].expenses += Number(
      expense.amount || 0
    );
  });

  const monthlyChartData =
    Object.values(monthlyData);

  return (
    
      <DashboardLayout>
        <Layout>
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Analytics
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              Visualize spending patterns and financial trends.
            </p>
          </div>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* EXPENSE CATEGORY PIE CHART */}
          <div
            className="
              bg-white dark:bg-slate-900
              p-4 sm:p-5 lg:p-6
              rounded-2xl
              shadow
            "
          >
            <h2 className="text-lg sm:text-xl font-bold mb-6">
              Expenses by Category
            </h2>

            {expenseByCategory.length > 0 ? (
              <div className="h-[320px] sm:h-[380px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={expenseByCategory}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={
                        window.innerWidth <
                        640
                          ? 90
                          : 130
                      }
                      label
                    >
                      {expenseByCategory.map(
                        (
                          entry,
                          index
                        ) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                No expense data available.
              </div>
            )}
          </div>

          {/* MONTHLY COMPARISON BAR CHART */}
          <div
            className="
              bg-white dark:bg-slate-900
              p-4 sm:p-5 lg:p-6
              rounded-2xl
              shadow
            "
          >
            <h2 className="text-lg sm:text-xl font-bold mb-6">
              Monthly Income vs Expenses
            </h2>

            {monthlyChartData.length > 0 ? (
              <div className="h-[320px] sm:h-[380px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={
                      monthlyChartData
                    }
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <Tooltip />
                    <Legend />

                    <Bar
                      dataKey="income"
                      fill="#10b981"
                      radius={[
                        6, 6, 0, 0,
                      ]}
                    />

                    <Bar
                      dataKey="expenses"
                      fill="#ef4444"
                      radius={[
                        6, 6, 0, 0,
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                No financial data available.
              </div>
            )}
          </div>
        </div>
        </Layout>
      </DashboardLayout>
    
  );
};

export default Analytics;