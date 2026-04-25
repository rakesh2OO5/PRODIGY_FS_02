const variants = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

const Alert = ({ type = "info", message }) => {
  if (!message) {
    return null;
  }

  return <div className={`rounded-xl border px-4 py-3 text-sm ${variants[type]}`}>{message}</div>;
};

export default Alert;
