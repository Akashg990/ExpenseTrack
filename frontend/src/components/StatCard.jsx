const StatCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-900
        p-6 rounded-2xl
        shadow
      "
    >

      <h2 className="text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h2>

      <p
        className={`text-3xl font-bold ${color}`}
      >
        ₹{value}
      </p>

    </div>
  );
};

export default StatCard;