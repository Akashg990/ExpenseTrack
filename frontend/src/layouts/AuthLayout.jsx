import {
  Wallet,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Smart Expense Tracking",
    description: "Manage expenses, budgets, and income in one place.",
  },
  {
    icon: TrendingUp,
    title: "AI Financial Insights",
    description: "Get personalized recommendations powered by AI.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description: "Your financial data is protected and private.",
  },
];

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100 dark:bg-slate-950">
      
      {/* LEFT PANEL */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white p-12">
        <div className="relative z-10 flex flex-col justify-between w-full">
          
          {/* HEADER */}
          <div>
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur">
                <Wallet size={30} />
              </div>
              <h1 className="text-4xl font-bold">
                FinTrack AI
              </h1>
            </div>

            <p className="text-lg text-gray-300 max-w-xl leading-8">
              Take control of your finances with AI-powered insights,
              budgeting, analytics, and smart money management.
            </p>
          </div>

          {/* FEATURES */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="
                    flex items-start gap-4
                    p-5 rounded-2xl
                    bg-white/5 backdrop-blur
                    border border-white/10
                  "
                >
                  <div className="p-3 rounded-xl bg-white/10">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Sparkles size={16} />
            Powered by MERN Stack + Gemini AI
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative z-20 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div
            className="
              bg-white dark:bg-slate-900
              rounded-3xl shadow-2xl
              border border-gray-100 dark:border-slate-800
              p-8 lg:p-10
            "
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">
                {title}
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;