import {
  AddRegister,
  FindRegister,
} from "@/controllers/register/register.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import type { Request, Response } from "express";
import { check } from "express-validator";

const router = Router();

var findRegisterValidate = [
  check("id", "id is required").notEmpty(),
  validateError,
];
var addRegisterValidate = [
  check("tgl_periksa", "tanggal periksa is required").notEmpty(),
  validateError,
];
router.get("/find", findRegisterValidate, FindRegister);
router.post("/add", addRegisterValidate, AddRegister);

export default router;
