import { Login } from "@/controllers/guru/login.controller";
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

router.post("/login", loginValidate, Login);

export default router;
