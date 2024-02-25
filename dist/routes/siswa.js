"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_controller_1 = require("@/controllers/siswa/login.controller");
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
exports.default = router;
//# sourceMappingURL=siswa.js.map