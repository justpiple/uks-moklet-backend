"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var express_1 = require("express");
var auth_1 = require("@/middleware/auth");
var apiResponse_1 = require("@/utils/apiResponse");
var bulk_upload_controller_1 = require("@/controllers/bulk-upload/bulk-upload.controller");
var router = (0, express_1.Router)();
// MAIN ROUTER
router.use((0, auth_1.auth)("ADMIN"), (0, express_fileupload_1.default)({
    useTempFiles: false,
    tempFileDir: "bulk_temp_file/",
    limits: { fileSize: 10 * 1024 * 1024 },
}), excelFile);
router.post("/siswa", bulk_upload_controller_1.UploadSiswa);
function excelFile(req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json((0, apiResponse_1.BadRequest)("File excel is required."));
    }
    if (!req.files.excel) {
        return res.status(400).json((0, apiResponse_1.BadRequest)("File excel is required."));
    }
    var file = req.files.excel;
    if (file.mimetype !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        return res.status(400).json((0, apiResponse_1.BadRequest)("Format file must .xlsx"));
    }
    next();
}
exports.default = router;
//# sourceMappingURL=bulk-upload.js.map