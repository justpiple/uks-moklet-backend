import { Login } from "@/controllers/admin/login.controller";
import { isAdminMiddleware } from "@/middleware/auth.admin";
import { CreateAdmin } from "@/controllers/admin/create.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import type { Request, Response } from "express";
import { check } from "express-validator";

const router = Router();

var loginValidate = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  validateError,
];
// var createAdminValidate = [
//   check("email", "Email is required").isEmail(),
//   check("name", "Name is required").notEmpty(),
//   check("password", "Password is required").notEmpty,
//   validateError,
// ];
router.post("/login", loginValidate, Login);
// router.post("/create", createAdminValidate, CreateAdmin);

export default router;
