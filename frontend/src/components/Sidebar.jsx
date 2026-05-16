import {
  LayoutDashboard,
  Wallet,
  PieChart,
  Landmark,
  IndianRupee,
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="
        w-[260px]
        bg-black text-white
        min-h-screen
        p-6
      "
    >

      <h1 className="text-3xl font-bold mb-10">
        FinTrack
      </h1>


      <div className="flex flex-col gap-3">


        <Link
          to="/"
          className="
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-800
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>


        <Link
          to="/expenses"
          className="
          sidebar-expenses
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-800
          "
        >
          <Wallet size={20} />
          Expenses
        </Link>


        <Link
          to="/income"
          className="
          sidebar-income
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-800
          "
        >
          <IndianRupee size={20} />
          Income
        </Link>


        <Link
          to="/budgets"
          className="
          sidebar-budgets
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-800
          "
        >
          <Landmark size={20} />
          Budgets
        </Link>


        <Link
          to="/analytics"
          className="
          sidebar-analytics
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-800
          "
        >
          <PieChart size={20} />
          Analytics
        </Link>

      <button
  onClick={() => {
    // Remove the flag so the onboarding component runs again
    localStorage.removeItem("hasSeenTour");

    // Notify OnboardingTour to start immediately
    window.dispatchEvent(
      new Event("start-onboarding-tour")
    );
  }}
  className="
    w-full
    flex items-center gap-3
    flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-800
    transition
  "
>
   Start Tour
</button>

      </div>

    </div>
  );
};

export default Sidebar;