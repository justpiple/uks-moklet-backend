"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentSession = exports.Logout = void 0;
var apiResponse_1 = require("@/utils/apiResponse");
var Logout = function (req, res) {
    res.clearCookie("token").end();
};
exports.Logout = Logout;
var CurrentSession = function (req, res) {
    res.json((0, apiResponse_1.Success)("Success load current user", { data: req.token }));
};
exports.CurrentSession = CurrentSession;
//# sourceMappingURL=auth.controller.js.map