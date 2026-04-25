const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^[0-9+\-()\s]{7,20}$/;

export const validateLogin = (values) => {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateEmployee = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!phoneRegex.test(values.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.role.trim()) {
    errors.role = "Role is required";
  }

  if (values.salary === "") {
    errors.salary = "Salary is required";
  } else if (Number(values.salary) < 0 || Number.isNaN(Number(values.salary))) {
    errors.salary = "Salary must be a positive number";
  }

  return errors;
};
