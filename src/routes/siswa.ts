import { Login } from "@/controllers/siswa/login.controller";
import {
  CreateSiswa,
  DeleteSiswa,
  FindSiswaById,
  GetAllSiswa,
  GetAllSiswaPagination,
  SearchSiswa,
  UpdateSiswa,
} from "@/controllers/siswa/siswa.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

var loginValidate = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  validateError,
];
router.post("/login", loginValidate, Login);
router.get("/search", auth("ALL"), SearchSiswa);

router.use(auth("ADMIN"));
router.get("/", GetAllSiswa);
router.post("/", CreateSiswa);
router.get("/:id", FindSiswaById);
router.put("/:id", UpdateSiswa);
router.delete("/:id", DeleteSiswa);

export default router;
