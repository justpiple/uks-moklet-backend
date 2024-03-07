"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateError = void 0;
var express_validator_1 = require("express-validator");
var validateError = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array(), status: 422 });
    }
    next();
};
exports.validateError = validateError;
//# sourceMappingURL=validateError.js.map