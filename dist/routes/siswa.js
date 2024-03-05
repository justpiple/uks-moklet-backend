"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_controller_1 = require("@/controllers/siswa/login.controller");
var siswa_controller_1 = require("@/controllers/siswa/siswa.controller");
var auth_1 = require("@/middleware/auth");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
var loginValidate = [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").notEmpty(),
    validateError_1.validateError,
];
router.post("/login", loginValidate, login_controller_1.Login);
router.get("/search", (0, auth_1.auth)("ALL"), siswa_controller_1.SearchSiswa);
router.use((0, auth_1.auth)("ADMIN"));
router.get("/", siswa_controller_1.GetAllSiswa);
router.post("/", siswa_controller_1.CreateSiswa);
router.get("/:id", siswa_controller_1.FindSiswaById);
router.put("/:id", siswa_controller_1.UpdateSiswa);
router.delete("/:id", siswa_controller_1.DeleteSiswa);
exports.default = router;
//# sourceMappingURL=siswa.js.map