"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var google_controller_1 = require("@/controllers/google/google.controller");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATION
var callbackValidate = [
    (0, express_validator_1.check)("code", "Code callback is required").notEmpty(),
    validateError_1.validateError,
];
// MAIN ROUTER
router.get("/auth", google_controller_1.Auth);
router.get("/callback", callbackValidate, google_controller_1.callback);
exports.default = router;
//# sourceMappingURL=google.js.map