import useAIStore from "../store/aiStore";

const AIInsights = () => {

  const {
    insights,
    loading,
    generateInsights,
  } = useAIStore();

console.log(insights);
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        p-6 rounded-2xl shadow
        mt-8
      "
    >
       
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          AI Financial Insights
        </h2>

        <button
          onClick={generateInsights}
          className="
            bg-black text-white
            px-4 py-2 rounded-lg
          "
        >
          Generate Insights
        </button>

      </div>


      {loading ? (

       <p className="animate-pulse">
  AI is analyzing your finances...
</p>

      ) : (

        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">

          {insights || "No insights generated yet."}

        </div>

      )}

    </div>
  );
};

export default AIInsights;