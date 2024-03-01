import {
  FindRujukanById,
  CreateRujukan,
  UpdateRujukan,
  DeleteRujukan,
  GetAllRujukan,
} from "@/controllers/rujukan/rujukan.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var postRujukanValidate = [
  check("detail_register_id", "detail_register_id is required").notEmpty(),
  check("analisa_dokter", "analisa_dokter is required").notEmpty(),
  check("nama_dokter", "nama_dokter is required").notEmpty(),
  validateError,
];

// MAIN ROUTRER
router.use(auth("ADMIN"));
router.get("/", GetAllRujukan);
router.get("/:id", FindRujukanById);
router.post("/", postRujukanValidate, CreateRujukan);
router.put("/:id", postRujukanValidate, UpdateRujukan);
router.delete("/:id", DeleteRujukan);

export default router;
