import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/AuthInput";

import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await login(formData);

  if (success) {
    navigate("/");
  }
};

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue managing your finances."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
         type="submit"
          className="
            w-full
            bg-black text-white
            py-3 rounded-xl
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-black dark:text-white"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;