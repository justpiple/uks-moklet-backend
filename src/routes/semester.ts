import {
  CreateSemester,
  UpdateSemester,
  DeleteSemester,
  GetAllSemester,
  FindSemesterById,
} from "@/controllers/semester/semester.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATIONs
var postSemesterValidate = [
  check("tahun_ajaran", "tahun_ajaran is required").notEmpty(),
  check("semester", "semester is required").notEmpty(),
  check("tgl_awal", "tgl_awal is required").notEmpty(),
  check("tgl_akhir", "tgl_akhir is required").notEmpty(),
  validateError,
];

// MAIN ROUTRER
router.use(auth("ALL"));
router.get("/", GetAllSemester);
router.get("/:id", FindSemesterById);

router.use(auth("ADMIN"));
router.post("/", postSemesterValidate, CreateSemester);
router.put("/:id", postSemesterValidate, UpdateSemester);
router.delete("/:id", DeleteSemester);

export default router;
