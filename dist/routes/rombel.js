"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rombel_controller_1 = require("@/controllers/rombel/rombel.controller");
var auth_1 = require("@/middleware/auth");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATION
var postRombelValidate = [
    (0, express_validator_1.check)("kelas_id", "nama_kelas is required").notEmpty(),
    (0, express_validator_1.check)("semester_id", "tingkat is required").notEmpty(),
    (0, express_validator_1.check)("guru_id", "tingkat is required").notEmpty(),
    validateError_1.validateError,
];
// MAIN ROUTRER
router.use((0, auth_1.auth)("ADMIN", "WALAS"));
router.get("/", rombel_controller_1.GetAllRombel);
router.get("/:id", rombel_controller_1.FindRombelById);
router.use((0, auth_1.auth)("ADMIN"));
router.post("/", postRombelValidate, rombel_controller_1.CreateRombel);
router.put("/:id", postRombelValidate, rombel_controller_1.UpdateRombel);
router.delete("/:id", rombel_controller_1.DeleteRombel);
exports.default = router;
//# sourceMappingURL=rombel.js.map