import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import AuthInput from "../components/AuthInput";

import useAuthStore from "../store/authStore";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
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

  await register(formData);

  const currentUser =
    useAuthStore.getState().user;

  if (currentUser) {
    navigate("/");
  }
};

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your smart financial journey today."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

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
          className="
            w-full
            bg-black text-white
            py-3 rounded-xl
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-black dark:text-white"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;