import { NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const DashboardLayout = () => {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <aside className="w-full bg-slate-950 px-6 py-8 text-white md:w-72">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">EMS</p>
            <h1 className="mt-3 text-3xl font-bold">Admin Console</h1>
            <p className="mt-3 text-sm text-slate-400">
              Track your workforce, manage records, and stay organized.
            </p>
          </div>

          <nav className="space-y-3">
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? "bg-white text-slate-950" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Employees
            </NavLink>
          </nav>

          <div className="mt-10 rounded-2xl bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Signed in as</p>
            <p className="mt-2 text-sm font-medium">{admin?.email}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-4 w-full rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
