"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSiswa = exports.isWalas = exports.isAdmin = void 0;
var apiResponse_1 = require("@/utils/apiResponse");
// Middleware to verify JWT and check if the user has admin role
var isAdmin = function (req, res, next) {
    try {
        if (req.token.role != "ADMIN")
            return res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized: Not admin"));
        next();
    }
    catch (error) {
        return res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized: Invalid token"));
    }
};
exports.isAdmin = isAdmin;
var isWalas = function (req, res, next) {
    try {
        if (req.token.role != "WALAS")
            res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized: Not walas"));
        next();
    }
    catch (error) {
        return res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized: Invalid token"));
    }
};
exports.isWalas = isWalas;
var isSiswa = function (req, res, next) {
    try {
        if (req.token.role != "SISWA")
            return res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized: Not siswa"));
        next();
    }
    catch (error) {
        return res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized: Invalid token"));
    }
};
exports.isSiswa = isSiswa;
//# sourceMappingURL=auth.js.map