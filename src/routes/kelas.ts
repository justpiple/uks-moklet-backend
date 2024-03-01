import {
  FindKelasById,
  CreateKelas,
  UpdateKelas,
  DeleteKelas,
  GetAllKelas,
} from "@/controllers/kelas/kelas.controller";
import { auth } from "@/middleware/auth";
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
router.use(auth(["ADMIN", "WALAS"]));
router.get("/", GetAllKelas);
router.get("/:id", FindKelasById);
router.post("/", postKelasValidate, CreateKelas);
router.put("/:id", postKelasValidate, UpdateKelas);
router.delete("/:id", DeleteKelas);

export default router;
