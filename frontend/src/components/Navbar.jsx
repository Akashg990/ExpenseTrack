import {
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

import useThemeStore from "../store/themeStore";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const {
    darkMode,
    toggleTheme,
  } = useThemeStore();


  const handleLogout = () => {
    logout();

    navigate("/login");
  };


  return (
    <div
      className="
        bg-white dark:bg-slate-900
        border-b border-gray-200 dark:border-slate-700
        p-4 flex justify-between items-center
      "
    >

      <h2 className="text-xl font-semibold">
        Welcome, {user?.name}
      </h2>


      <div className="flex items-center gap-4">

        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-lg
            bg-gray-100 dark:bg-slate-800
          "
        >

          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}

        </button>


        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            bg-red-500 text-white
            px-4 py-2 rounded-lg
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
};

export default Navbar;