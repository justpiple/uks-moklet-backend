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

var postDetailRegisterValidate = [
  check("register_id", "register_id is required").notEmpty(),
  check("hasil_periksa", "hasil_periksa is required").notEmpty(),
  check("analisa", "analisa is required").notEmpty(),
  check("tindakan", "tindakan is required").notEmpty(),
  check("evaluasi", "evaluasi is required").notEmpty(),
  check("lanjutan", "lanjutan is required").notEmpty(),
  check("guru_id", "guru_id is required").notEmpty(),
  validateError,
];
router.post("/", postDetailRegisterValidate, AddDetailRegister);
router.put("/:id", postDetailRegisterValidate, UpdateDetailRegister);
router.delete("/:id", DeleteDetailRegister);

export default router;
