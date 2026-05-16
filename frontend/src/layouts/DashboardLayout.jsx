import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

      <main
  className="
    p-6 flex-1 overflow-y-auto
    bg-gray-100 dark:bg-slate-950
    text-black dark:text-white
    transition-all duration-300
  "
>
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;