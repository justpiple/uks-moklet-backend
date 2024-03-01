import {
  FindDetailRegisterById,
  CreateDetailRegister,
  UpdateDetailRegister,
  DeleteDetailRegister,
} from "@/controllers/register/detail-register.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
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

// MAIN ROUTER
router.use(auth(["ADMIN", "WALAS"]));
router.get("/:id", FindDetailRegisterById);
router.post("/", postDetailRegisterValidate, CreateDetailRegister);
router.put("/:id", postDetailRegisterValidate, UpdateDetailRegister);
router.delete("/:id", DeleteDetailRegister);

export default router;
