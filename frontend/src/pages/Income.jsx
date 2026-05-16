import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Layout from "../components/Layout";

import useIncomeStore from "../store/incomeStore";

const Income = () => {
  const {
    incomes ,
    fetchIncomes,
    addIncome,
    deleteIncome,
  } = useIncomeStore();

  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addIncome({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      source: "",
      amount: "",
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
              Income
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              Track all your income sources and monitor earnings.
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
              name="source"
              placeholder="Income Source"
              value={formData.source}
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
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="
                border p-3 rounded-xl
                bg-white dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
                w-full md:col-span-2
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
            Add Income
          </button>
        </form>

        {/* INCOME LIST */}
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
                    Source
                  </th>
                  <th className="p-3 text-left">
                    Amount
                  </th>
                  <th className="p-3 text-left">
                    Description
                  </th>
                  <th className="p-3 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {incomes.map((income) => (
                  <tr
                    key={income._id}
                    className="border-b dark:border-slate-800"
                  >
                    <td className="p-3">
                      {income.source}
                    </td>

                    <td className="p-3 font-semibold text-green-600">
                      ₹{income.amount}
                    </td>

                    <td className="p-3">
                      {income.description || "-"}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          deleteIncome(income._id)
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
            {incomes.map((income) => (
              <div
                key={income._id}
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
                      {income.source}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {income.description || "No description"}
                    </p>
                  </div>

                  <span className="font-bold text-lg text-green-600">
                    ₹{income.amount}
                  </span>
                </div>

                <button
                  onClick={() =>
                    deleteIncome(income._id)
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
          {incomes.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No income records added yet.
            </div>
          )}
        </div>
        </Layout>
      </DashboardLayout>
    
  );
};

export default Income;