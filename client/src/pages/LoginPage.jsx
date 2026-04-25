import { useState } from "react";
import { Navigate } from "react-router-dom";

import Alert from "../components/Alert.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { validateLogin } from "../utils/validation.js";

const LoginPage = () => {
  const { login, isAuthenticated, authLoading } = useAuth();
  const [values, setValues] = useState({
    email: "admin@test.com",
    password: "admin123",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/employees" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateLogin(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      setAlert({ type: "", message: "" });
      await login(values);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_55%)] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-slate-950 p-10 text-white lg:block">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Employee Management</p>
          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Manage your team with a calmer, cleaner workflow.
          </h1>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-slate-950">Admin Login</h2>
          <div className="mt-6">
            <Alert type={alert.type} message={alert.message} />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
              />
              {errors.email ? <span className="mt-1 block text-xs text-rose-600">{errors.email}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
              />
              {errors.password ? (
                <span className="mt-1 block text-xs text-rose-600">{errors.password}</span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
