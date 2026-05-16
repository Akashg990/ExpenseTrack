const AuthInput = ({
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      required
      {...props}
      className="
        w-full
        px-4 py-3
        rounded-xl
        border border-gray-200 dark:border-slate-700
        bg-gray-50 dark:bg-slate-800
        focus:outline-none
        focus:ring-2 focus:ring-black dark:focus:ring-white
        dark:text-white
      "
    />
  );
};

export default AuthInput;