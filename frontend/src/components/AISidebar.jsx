import {
  Bot,
  X,
  Sparkles,
} from "lucide-react";

import useAIStore from "../store/aiStore";
import useAIUIStore from "../store/aiUIStore";

const AISidebar = () => {

  const {
    isOpen,
    closeAI,
  } = useAIUIStore();

  const {
    insights,
    loading,
    generateInsights,
  } = useAIStore();


  return (
    <>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={closeAI}
          className="
            fixed inset-0
            bg-black/40
            z-40
          "
        />
      )}


      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 right-0
          h-screen w-full sm:w-[400px]
          bg-white dark:bg-slate-950
          border-l border-gray-200 dark:border-slate-800
          shadow-2xl
          z-50
          transition-all duration-300
          flex flex-col
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* HEADER */}
        <div
          className="
            p-5 border-b
            border-gray-200 dark:border-slate-800
            flex items-center justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                bg-black text-white
                p-2 rounded-xl
              "
            >
              <Bot size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                AI Finance Assistant
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Smart financial insights
              </p>
            </div>

          </div>


          <button
            onClick={closeAI}
            className="
              p-2 rounded-lg
              hover:bg-gray-100
              dark:hover:bg-slate-800
            "
          >
            <X size={20} />
          </button>

        </div>


        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">

          <button
            disabled={loading}
            onClick={generateInsights}
            className="
              w-full
              bg-black text-white
              py-3 rounded-xl
              flex items-center justify-center gap-2
              font-semibold
              disabled:opacity-50
              mb-6
            "
          >
            <Sparkles size={18} />

            {loading
              ? "Analyzing..."
              : "Generate Insights"}

          </button>


          {/* INSIGHTS */}
          <div
            className="
              bg-gray-100 dark:bg-slate-900
              rounded-2xl
              p-5
              min-h-[300px]
              whitespace-pre-wrap
              text-sm leading-7
            "
          >

            {loading ? (

              <div className="space-y-4 animate-pulse">

                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded" />
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded" />
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded" />
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded" />

              </div>

            ) : (

              insights ||

              `
Welcome to your AI Finance Assistant.

Generate personalized financial insights based on:

• Expenses
• Income
• Budgets
• Savings
• Spending habits

Your assistant will analyze your financial behavior and provide smart recommendations.
              `

            )}

          </div>

        </div>

      </div>

    </>
  );
};

export default AISidebar;