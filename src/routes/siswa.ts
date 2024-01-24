import { Login } from "@/controllers/siswa/login.controller";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import type { Request, Response } from "express";
import { check } from "express-validator";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of your account
 *         password:
 *           type: string
 *           description: The password of your account
 *     LoginSuccess:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: number
 *           example: 200
 *         success:
 *           type: boolean
 *         data:
 *          type: object
 *          properties:
 *            id: string
 *            token: string
 *            name: string
 *            akses: string
 *
 *     422Props:
 *       type: object
 *       properties:
 *         type: string
 *         msg: string
 *         path: string
 *         location: string
 *     401:
 *       type: object
 *       properties:
 *         message: string
 *         status: integer
 *         success: boolean
 *     422:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/422Props'
 *           description: list of error
 * tags:
 *   name: Account
 *   description: Access to account
 * /siswa/login:
 *   post:
 *     summary: Login Siswa
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
 *               $ref: '#/components/schemas/LoginSuccess'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
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
