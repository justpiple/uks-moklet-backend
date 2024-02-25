"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var detail_register_controller_1 = require("@/controllers/register/detail-register.controller");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATION
var postDetailRegisterValidate = [
    (0, express_validator_1.check)("register_id", "register_id is required").notEmpty(),
    (0, express_validator_1.check)("hasil_periksa", "hasil_periksa is required").notEmpty(),
    (0, express_validator_1.check)("analisa", "analisa is required").notEmpty(),
    (0, express_validator_1.check)("tindakan", "tindakan is required").notEmpty(),
    (0, express_validator_1.check)("evaluasi", "evaluasi is required").notEmpty(),
    (0, express_validator_1.check)("lanjutan", "lanjutan is required").notEmpty(),
    (0, express_validator_1.check)("guru_id", "guru_id is required").notEmpty(),
    validateError_1.validateError,
];
// MAIN ROUTER
router.get("/:id", detail_register_controller_1.FindDetailRegisterById);
router.post("/", postDetailRegisterValidate, detail_register_controller_1.CreateDetailRegister);
router.put("/:id", postDetailRegisterValidate, detail_register_controller_1.UpdateDetailRegister);
router.delete("/:id", detail_register_controller_1.DeleteDetailRegister);
exports.default = router;
//# sourceMappingURL=detail-register.js.map