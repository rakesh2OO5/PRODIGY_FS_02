import Employee from "../models/Employee.js";

const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "5", 10), 1);
    const search = (req.query.search || "").trim();

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { role: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalEmployees = await Employee.countDocuments(query);
    const totalPages = Math.max(Math.ceil(totalEmployees / limit), 1);
    const employees = await Employee.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      employees,
      pagination: {
        page,
        limit,
        totalEmployees,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createEmployee, getEmployees, updateEmployee, deleteEmployee };
