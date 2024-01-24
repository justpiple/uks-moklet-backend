import {
  FindRegisterById,
  CreateRegister,
  DeleteRegister,
  UpdateRegister,
} from "@/controllers/register/register.controller";
import { validateError } from "@/middleware/validateError";
import { create } from "domain";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterPost:
 *       type: object
 *       required:
 *         - tgl_periksa
 *         - siswa_id
 *       properties:
 *         tgl_periksa:
 *           type: date
 *           description: Tanggal periksa siswa
 *         siswa_id:
 *           type: string
 *           description: ID Siswa yang periksa
 *     404:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: number
 *           example: 404
 *         success:
 *           type: boolean
 *           example: false
 *     200:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: number
 *           example: 200
 *         success:
 *           type: boolean
 *     findRegister:
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
 *           type: object
 * /register:
 *   post:
 *     summary: Create new register data
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPost'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPost'
 *     responses:
 *       200:
 *         description: Create success.
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
 * /register/{id}:
 *   delete:
 *     summary: Delete register data
 *     tags: [Register]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 36
 *        description: registration ID
 *     responses:
 *       200:
 *         description: Delete success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/200'
 *
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *
 *       404:
 *         description: Data not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404'
 *   get:
 *     summary: Get register data
 *     tags: [Register]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 36
 *        description: registration ID
 *     responses:
 *       200:
 *         description: Success find data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/findRegister'
 *
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *
 *       404:
 *         description: Data not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404'
 *   put:
 *     summary: Update register data
 *     tags: [Register]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 36
 *        description: registration ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPost'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPost'
 *     responses:
 *       200:
 *         description: Update success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/200'
 *
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *
 *       404:
 *         description: Data not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404'
 *
 */

// VALIDATION
var postRegisterValidate = [
  check("tgl_periksa", "tgl_periksa is required").notEmpty(),
  check("siswa_id", "siswa_id is required").notEmpty(),
  validateError,
];

// MAIN ROUTER
router.get("/find/:id", FindRegisterById);
router.post("/create", postRegisterValidate, CreateRegister);
router.put("/update/:id", postRegisterValidate, UpdateRegister);
router.delete("/delete/:id", DeleteRegister);

export default router;
