import { useEffect, useState } from "react";

import { validateEmployee } from "../utils/validation.js";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  salary: "",
};

const EmployeeForm = ({ selectedEmployee, onSubmit, onCancel, isSubmitting }) => {
  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) {
      setValues({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone,
        role: selectedEmployee.role,
        salary: selectedEmployee.salary,
      });
    } else {
      setValues(initialFormState);
    }

    setErrors({});
  }, [selectedEmployee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateEmployee(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    await onSubmit({
      ...values,
      salary: Number(values.salary),
    });

    if (!selectedEmployee) {
      setValues(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {selectedEmployee ? "Edit Employee" : "Add Employee"}
          </h2>
          <p className="text-sm text-slate-500">Manage employee records from one place.</p>
        </div>
        {selectedEmployee ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Name", name: "name", type: "text", placeholder: "Employee name" },
          { label: "Email", name: "email", type: "email", placeholder: "employee@example.com" },
          { label: "Phone", name: "phone", type: "text", placeholder: "+91 9876543210" },
          { label: "Role", name: "role", type: "text", placeholder: "Frontend Developer" },
          { label: "Salary", name: "salary", type: "number", placeholder: "50000" },
        ].map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:bg-white"
            />
            {errors[field.name] ? (
              <span className="mt-1 block text-xs text-rose-600">{errors[field.name]}</span>
            ) : null}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Saving..." : selectedEmployee ? "Update Employee" : "Create Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
