import {
  AddDetailRegister,
  UpdateDetailRegister,
  DeleteDetailRegister,
} from "@/controllers/register/detail-register.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import type { Request, Response } from "express";
import { check } from "express-validator";

const router = Router();

var idDetailRegisterValidate = [
  check("id", "id is required").notEmpty(),
  validateError,
];
var postDetailRegisterValidate = [
  check("register_id", "Register ID is required").notEmpty(),
  check("hasil_periksa", "Hasil periksa is required").notEmpty(),
  check("analisa", "Analisa is required").notEmpty(),
  check("tindakan", "Tindakan is required").notEmpty(),
  check("evaluasi", "Evaluasi is required").notEmpty(),
  check("lanjutan", "Lanjutan is required").notEmpty(),
  check("guru_id", "Guru ID is required").notEmpty(),
  validateError,
];
router.post("/create", postDetailRegisterValidate, AddDetailRegister);
router.put("/update", postDetailRegisterValidate, UpdateDetailRegister);
router.delete("/delete", idDetailRegisterValidate, DeleteDetailRegister);

export default router;
