import { Login } from "@/controllers/siswa/login.controller";
import { GetAllSiswa, SearchSiswa } from "@/controllers/siswa/siswa.controller";
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
router.get("/", auth("ADMIN"), GetAllSiswa);
router.get("/search", SearchSiswa);

export default router;
