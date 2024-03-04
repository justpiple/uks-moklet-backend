import { CurrentSession, Logout } from "@/controllers/auth/auth.controller";
import { auth } from "@/middleware/auth";
import { Router } from "express";

const router = Router();

// MAIN ROUTER
router.get("/logout", Logout);
router.get("/me", auth("ALL"), CurrentSession as any);

export default router;
