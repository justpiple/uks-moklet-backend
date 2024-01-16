import { GetRegisterById } from "@/controllers/register/register.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import type { Request, Response } from "express";
import { check } from "express-validator";

const router = Router();

var registerValidate = [
  check("id", "Id is required").notEmpty(),
  validateError,
];
router.get("/getbyid", registerValidate, GetRegisterById);

export default router;
