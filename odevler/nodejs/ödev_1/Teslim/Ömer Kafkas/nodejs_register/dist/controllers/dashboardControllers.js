"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const express_1 = __importDefault(require("express"));
exports.dashboardController = express_1.default.Router();
exports.dashboardController.get("/", (req, res) => {
    res.render('dashboard');
});
//# sourceMappingURL=dashboardControllers.js.map