"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rujukan_controller_1 = require("@/controllers/rujukan/rujukan.controller");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATION
var postRujukanValidate = [
    (0, express_validator_1.check)("detail_register_id", "detail_register_id is required").notEmpty(),
    (0, express_validator_1.check)("analisa_dokter", "analisa_dokter is required").notEmpty(),
    (0, express_validator_1.check)("nama_dokter", "nama_dokter is required").notEmpty(),
    validateError_1.validateError,
];
// MAIN ROUTRER
router.get("/", rujukan_controller_1.GetAllRujukan);
router.get("/:id", rujukan_controller_1.FindRujukanById);
router.post("/", postRujukanValidate, rujukan_controller_1.CreateRujukan);
router.put("/:id", postRujukanValidate, rujukan_controller_1.UpdateRujukan);
router.delete("/:id", rujukan_controller_1.DeleteRujukan);
exports.default = router;
//# sourceMappingURL=rujukan.js.map