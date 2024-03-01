"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semester_controller_1 = require("@/controllers/semester/semester.controller");
var auth_1 = require("@/middleware/auth");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATIONs
var postSemesterValidate = [
    (0, express_validator_1.check)("tahun_ajaran", "tahun_ajaran is required").notEmpty(),
    (0, express_validator_1.check)("semester", "semester is required").notEmpty(),
    (0, express_validator_1.check)("tgl_awal", "tgl_awal is required").notEmpty(),
    (0, express_validator_1.check)("tgl_akhir", "tgl_akhir is required").notEmpty(),
    validateError_1.validateError,
];
// MAIN ROUTRER
router.use((0, auth_1.auth)("ALL"));
router.get("/", semester_controller_1.GetAllSemester);
router.get("/:id", semester_controller_1.FindSemesterById);
router.use((0, auth_1.auth)("ADMIN"));
router.post("/", postSemesterValidate, semester_controller_1.CreateSemester);
router.put("/:id", postSemesterValidate, semester_controller_1.UpdateSemester);
router.delete("/:id", semester_controller_1.DeleteSemester);
exports.default = router;
//# sourceMappingURL=semester.js.map