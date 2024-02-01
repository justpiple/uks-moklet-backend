import {
  FindKelasById,
  CreateKelas,
  UpdateKelas,
  DeleteKelas,
} from "@/controllers/kelas/kelas.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var postKelasValidate = [
  check("nama_kelas", "nama_kelas is required").notEmpty(),
  check("tingkat", "tingkat is required").notEmpty(),
  validateError,
];

// MAIN ROUTRER
router.get("/:id", FindKelasById);
router.post("/create", postKelasValidate, CreateKelas);
router.put("/update/:id", postKelasValidate, UpdateKelas);
router.delete("/delete/:id", DeleteKelas);

export default router;
