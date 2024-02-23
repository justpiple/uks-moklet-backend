import {
  FindRujukanById,
  CreateRujukan,
  UpdateRujukan,
  DeleteRujukan,
} from "@/controllers/rujukan/rujukan.controller";
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
router.get("/:id", FindRujukanById);
router.post("/create", postRujukanValidate, CreateRujukan);
router.put("/update/:id", postRujukanValidate, UpdateRujukan);
router.delete("/delete/:id", DeleteRujukan);

export default router;
