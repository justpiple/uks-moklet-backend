import {
  AddRegister,
  DeleteRegister,
  FindRegister,
  SiswaFindRegister,
  UpdateRegister,
} from "@/controllers/register/register.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import type { Request, Response } from "express";
import { check } from "express-validator";

const router = Router();

var idRegisterValidate = [
  check("id", "id is required").notEmpty(),
  validateError,
];
var postRegisterValidate = [
  check("tgl_periksa", "tanggal periksa is required").notEmpty(),
  validateError,
];
router.get("/find", idRegisterValidate, FindRegister);
router.get("/siswa/find", idRegisterValidate, SiswaFindRegister);
router.post("/create", postRegisterValidate, AddRegister);
router.put("/update", postRegisterValidate, UpdateRegister);
router.delete("/delete", idRegisterValidate, DeleteRegister);

export default router;
