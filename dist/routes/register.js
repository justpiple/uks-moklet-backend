"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var register_controller_1 = require("@/controllers/register/register.controller");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATION
var postRegisterValidate = [
    (0, express_validator_1.check)("tgl_periksa", "tgl_periksa is required").notEmpty(),
    (0, express_validator_1.check)("siswa_id", "siswa_id is required").notEmpty(),
    validateError_1.validateError,
];
// MAIN ROUTER
router.get("/", register_controller_1.GetAllRegister);
router.get("/:id", register_controller_1.FindRegisterById);
router.post("/", postRegisterValidate, register_controller_1.CreateRegister);
router.put("/:id", postRegisterValidate, register_controller_1.UpdateRegister);
router.delete("/:id", register_controller_1.DeleteRegister);
exports.default = router;
//# sourceMappingURL=register.js.map