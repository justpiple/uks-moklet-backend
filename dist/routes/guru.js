"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guru_controller_1 = require("@/controllers/guru/guru.controller");
var login_controller_1 = require("@/controllers/guru/login.controller");
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
router.use((0, auth_1.auth)("ADMIN"));
router.get("/", guru_controller_1.GetAllGuru);
router.post("/", guru_controller_1.CreateGuru);
router.get("/:id", guru_controller_1.FindGuruById);
router.put("/:id", guru_controller_1.UpdateGuru);
router.delete("/:id", guru_controller_1.DeleteGuru);
exports.default = router;
//# sourceMappingURL=guru.js.map