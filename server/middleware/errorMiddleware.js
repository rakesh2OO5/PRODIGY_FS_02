const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((item) => item.message),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value",
      errors: Object.keys(err.keyPattern).map(
        (key) => `${key.charAt(0).toUpperCase() + key.slice(1)} already exists`
      ),
    });
  }

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
};

export { notFound, errorHandler };
