import {
  CreateRombel,
  DeleteRombel,
  FindRombelById,
  GetAllRombel,
  UpdateRombel,
} from "@/controllers/rombel/rombel.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var postRombelValidate = [
  check("kelas_id", "nama_kelas is required").notEmpty(),
  check("semester_id", "tingkat is required").notEmpty(),
  check("guru_id", "tingkat is required").notEmpty(),
  validateError,
];

// MAIN ROUTRER
router.use(auth("ADMIN", "WALAS"));
router.get("/", GetAllRombel);
router.get("/:id", FindRombelById);
router.use(auth("ADMIN"));
router.post("/", postRombelValidate, CreateRombel);
router.put("/:id", postRombelValidate, UpdateRombel);
router.delete("/:id", DeleteRombel);

export default router;
