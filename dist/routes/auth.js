"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = require("@/controllers/auth/auth.controller");
var auth_1 = require("@/middleware/auth");
var express_1 = require("express");
var router = (0, express_1.Router)();
// MAIN ROUTER
router.get("/logout", auth_controller_1.Logout);
router.get("/me", (0, auth_1.auth)("ALL"), auth_controller_1.CurrentSession);
exports.default = router;
//# sourceMappingURL=auth.js.map