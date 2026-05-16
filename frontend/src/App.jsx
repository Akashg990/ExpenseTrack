import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expense";
import Income from "./pages/Income";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import OnboardingTour from "./components/OnboardingTour";

import FloatingAIButton from "./components/FloatingAIButton";
import AISidebar from "./components/AISidebar";

import useThemeStore from "./store/themeStore";
import useAuthStore from "./store/authStore";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Wrapper
const PublicRoute = ({ children }) => {
  const { user } = useAuthStore();

  return user ? <Navigate to="/" replace /> : children;
};

const App = () => {
  const { darkMode } = useThemeStore();
  const { user } = useAuthStore();

  return (
    <div
      className={
        darkMode
          ? "dark min-h-screen bg-slate-950 text-white"
          : "min-h-screen bg-gray-100 text-black"
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <Budgets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      {/* Global AI Assistant - Visible Only After Login */}
      {user && (
        <>
          <OnboardingTour />
          <FloatingAIButton />
          <AISidebar />
        </>
      )}
    </div>
  );
};

export default App;