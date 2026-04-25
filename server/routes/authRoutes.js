import express from "express";
import { body } from "express-validator";

import { getProfile, loginAdmin } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  loginAdmin
);

router.get("/me", authMiddleware, getProfile);

export default router;
