import express from "express";
import { body, param } from "express-validator";

import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

const employeeValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("phone")
    .trim()
    .matches(/^[0-9+\-()\s]{7,20}$/)
    .withMessage("Please enter a valid phone number"),
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("salary")
    .isFloat({ min: 0 })
    .withMessage("Salary must be a positive number"),
];

router.use(authMiddleware);

router.get("/", getEmployees);
router.post("/", employeeValidation, validateRequest, createEmployee);
router.put(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid employee id"), ...employeeValidation],
  validateRequest,
  updateEmployee
);
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid employee id")],
  validateRequest,
  deleteEmployee
);

export default router;
