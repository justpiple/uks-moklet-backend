"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kelas_controller_1 = require("@/controllers/kelas/kelas.controller");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATION
var postKelasValidate = [
    (0, express_validator_1.check)("nama_kelas", "nama_kelas is required").notEmpty(),
    (0, express_validator_1.check)("tingkat", "tingkat is required").notEmpty(),
    validateError_1.validateError,
];
// MAIN ROUTRER
router.get("/", kelas_controller_1.GetAllKelas);
router.get("/:id", kelas_controller_1.FindKelasById);
router.post("/", postKelasValidate, kelas_controller_1.CreateKelas);
router.put("/:id", postKelasValidate, kelas_controller_1.UpdateKelas);
router.delete("/:id", kelas_controller_1.DeleteKelas);
exports.default = router;
//# sourceMappingURL=kelas.js.map