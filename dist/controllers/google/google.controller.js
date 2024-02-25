"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = exports.Auth = void 0;
var apiResponse_1 = require("@/utils/apiResponse");
var guru_query_1 = require("@/utils/queries/guru.query");
var siswa_query_1 = require("@/utils/queries/siswa.query");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var BASE_URL = process.env.BASE_URL;
var Auth = function (req, res) {
    var redirect = "https://accounts.google.com/o/oauth2/v2/auth?prompt=select_account%20consent&response_type=code&client_id=".concat(CLIENT_ID, "&scope=openid%20email%20profile&redirect_uri=").concat(BASE_URL, "/google/callback");
    res.redirect(302, redirect);
};
exports.Auth = Auth;
var callback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var exchange_token, token_req, token, openid_url, userdata, user, id_admin, email, name, akses, jwtToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                exchange_token = "code=".concat(req.query.code, "&client_id=").concat(CLIENT_ID, "&client_secret=").concat(process.env.GOOGLE_CLIENT_SECRET, "&redirect_uri=").concat(BASE_URL, "/google/callback&grant_type=authorization_code");
                return [4 /*yield*/, fetch("https://oauth2.googleapis.com/token", {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        method: "POST",
                        body: exchange_token,
                    }).then(function (res) { return res.json(); })];
            case 1:
                token_req = (_a.sent());
                token = token_req.access_token;
                openid_url = "https://openidconnect.googleapis.com/v1/userinfo?access_token=".concat(token);
                return [4 /*yield*/, fetch(openid_url).then(function (res) {
                        return res.json();
                    })];
            case 2:
                userdata = (_a.sent());
                return [4 /*yield*/, (0, guru_query_1.findGuruByEmail)(userdata.email)];
            case 3:
                user = (_a.sent());
                if (!!user) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, siswa_query_1.findSiswaByEmail)(userdata.email)];
            case 4:
                user = _a.sent();
                _a.label = 5;
            case 5:
                if (!user) {
                    return [2 /*return*/, res.redirect("/")];
                }
                id_admin = user === null || user === void 0 ? void 0 : user.id;
                email = user === null || user === void 0 ? void 0 : user.email;
                name = user === null || user === void 0 ? void 0 : user.name;
                akses = (user === null || user === void 0 ? void 0 : user.akses) || "SISWA";
                jwtToken = jsonwebtoken_1.default.sign({ id: id_admin, name: name, email: email, role: akses }, process.env.JWT_SECRET, {
                    expiresIn: "15d",
                });
                // Membuat http cookie yang dikirimkan ke sisi client
                res.cookie("token", jwtToken, {
                    httpOnly: true,
                    maxAge: 15 * 24 * 60 * 60 * 1000,
                });
                res.json((0, apiResponse_1.Success)("Login success", {
                    data: {
                        token: jwtToken,
                        id: id_admin,
                        name: name,
                        akses: akses,
                    },
                }));
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(404).json({ error: 404 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.callback = callback;
//# sourceMappingURL=google.controller.js.map