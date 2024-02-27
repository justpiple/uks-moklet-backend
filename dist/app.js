"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: ".env" });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swaggerOption_1 = __importDefault(require("./utils/swaggerOption"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.disable("x-powered-by");
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
var rootRoute = fs_1.default.readdirSync("./src/routes");
rootRoute
    .filter(function (file) {
    return (/.(js|ts)$/.test(file) ||
        fs_1.default.lstatSync(__dirname + "/routes/" + file).isDirectory());
})
    .forEach(function (file) {
    file = file.replace(/\.[^.]*$/, "");
    try {
        var route = require(__dirname + "/routes/" + file).default;
        //import router handler
        app.use("/" + file, route);
        console.log(chalk_1.default.blue("[ INFO ] ") + "Route '" + file + "' imported successfully.");
    }
    catch (e) {
        console.log(chalk_1.default.blue("[ INFO ] ") +
            "Skipped '" +
            file +
            "' module because containing error.");
    }
});
var specs = (0, swagger_jsdoc_1.default)(swaggerOption_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use(function (req, res) {
    res.json({
        status: 404,
        message: "error_not_found",
    });
});
var server = app.listen(PORT, function () {
    return console.log("\uD83D\uDE80 Server ready at: http://localhost:3000");
});
//# sourceMappingURL=app.js.map