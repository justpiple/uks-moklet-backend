import {
  FindRegisterById,
  CreateRegister,
  DeleteRegister,
  UpdateRegister,
  GetAllRegister,
} from "@/controllers/register/register.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var postRegisterValidate = [
  check("tgl_periksa", "tgl_periksa is required").notEmpty(),
  check("siswa_id", "siswa_id is required").notEmpty(),
  validateError,
];

// MAIN ROUTER
router.get("/:id", auth("ALL"), FindRegisterById);

router.use(auth("ADMIN"));
router.post("/", postRegisterValidate, CreateRegister);
router.put("/:id", postRegisterValidate, UpdateRegister);
router.delete("/:id", DeleteRegister);
router.get("/", GetAllRegister);

export default router;
