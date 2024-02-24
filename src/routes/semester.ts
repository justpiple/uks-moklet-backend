import {
  FindSemesterById,
  CreateSemester,
  UpdateSemester,
  DeleteSemester,
  GetAllSemester,
} from "@/controllers/semester/semester.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var postSemesterValidate = [
  check("tahun_ajaran", "tahun_ajaran is required").notEmpty(),
  check("semester", "semester is required").notEmpty(),
  check("tgl_awal", "tgl_awal is required").notEmpty(),
  check("tgl_akhir", "tgl_akhir is required").notEmpty(),
  validateError,
];

// MAIN ROUTRER
router.get("/", GetAllSemester);
router.post("/", postSemesterValidate, CreateSemester);
router.put("/:id", postSemesterValidate, UpdateSemester);
router.delete("/:id", DeleteSemester);

export default router;
