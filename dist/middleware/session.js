"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var apiResponse_1 = require("@/utils/apiResponse");
var verifyToken = function (req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        return res.status(401).json((0, apiResponse_1.Unauthorize)("Invalid session"));
    }
    var JWTSecret = process.env.JWT_SECRET;
    var decoded = jsonwebtoken_1.default.verify(token, JWTSecret);
    req.token = decoded;
    next();
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=session.js.map