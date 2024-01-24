import { Login } from "@/controllers/guru/login.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

/**
 * @swagger
 * /guru/login:
 *   post:
 *     summary: Login Guru
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *
 *       422:
 *         description: Unprocessable entity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/422'
 *
 */

var loginValidate = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  validateError,
];

router.post("/login", loginValidate, Login);

export default router;
