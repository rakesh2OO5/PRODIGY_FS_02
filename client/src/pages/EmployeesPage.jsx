import { useEffect, useState } from "react";

import api from "../api/api.js";
import Alert from "../components/Alert.jsx";
import EmployeeForm from "../components/EmployeeForm.jsx";
import EmployeeTable from "../components/EmployeeTable.jsx";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalEmployees: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const fetchEmployees = async (currentPage = page, currentSearch = search) => {
    try {
      setLoading(true);
      const { data } = await api.get("/employees", {
        params: {
          page: currentPage,
          limit: 5,
          search: currentSearch,
        },
      });

      setEmployees(data.employees);
      setPagination(data.pagination);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to load employees.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(page, search);
  }, [page, search]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (selectedEmployee) {
        await api.put(`/employees/${selectedEmployee._id}`, values);
        setAlert({ type: "success", message: "Employee updated successfully." });
      } else {
        await api.post("/employees", values);
        setAlert({ type: "success", message: "Employee created successfully." });
      }

      setSelectedEmployee(null);
      setPage(1);
      setSearch("");
      setSearchInput("");
      await fetchEmployees(1, "");
    } catch (error) {
      const message =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        "Unable to save employee.";

      setAlert({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/employees/${id}`);
      setAlert({ type: "success", message: "Employee deleted successfully." });

      if (employees.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await fetchEmployees(page, search);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Unable to delete employee.",
      });
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-[linear-gradient(135deg,_#0f172a,_#1d4ed8)] p-6 text-white shadow-soft md:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Dashboard</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employee Management System</h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Create, search, update, and remove employee records with secure admin access.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
            Total employees: <span className="font-semibold">{pagination.totalEmployees}</span>
          </div>
        </div>
      </section>

      <Alert type={alert.type} message={alert.message} />

      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-soft sm:flex-row"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search by name, email, role, or phone"
          className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
        />
        <button
          type="submit"
          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchInput("");
            setSearch("");
            setPage(1);
          }}
          className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </form>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <EmployeeForm
          selectedEmployee={selectedEmployee}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedEmployee(null)}
          isSubmitting={submitting}
        />
        <EmployeeTable
          employees={employees}
          onEdit={setSelectedEmployee}
          onDelete={handleDelete}
          isLoading={loading}
          search={search}
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(nextPage) => setPage(nextPage)}
        />
      </div>
    </div>
  );
};

export default EmployeesPage;
