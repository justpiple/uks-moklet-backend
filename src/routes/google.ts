import { Auth, callback } from "@/controllers/google/google.controller";
import {
  FindDetailRegisterById,
  CreateDetailRegister,
  UpdateDetailRegister,
  DeleteDetailRegister,
} from "@/controllers/register/detail-register.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var callbackValidate = [
  check("code", "Code callback is required").notEmpty(),
  validateError,
];

// MAIN ROUTER
router.get("/auth", Auth);
router.get("/callback", callbackValidate, callback);

export default router;
