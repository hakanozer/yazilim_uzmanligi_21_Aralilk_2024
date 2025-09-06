"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = require("../../services/userService");
exports.userController = express_1.default.Router();
//userLogin
exports.userController.get("/", (req, res) => {
    res.render('login');
});
exports.userController.post('/login', (req, res) => {
    const user = req.body;
    const isValid = (0, userService_1.userLogin)(user);
    if (!isValid) {
        return res.render('login', { error: "Geçersiz email veya şifre" });
    }
    //res.redirect('/dashboard')
});
//# sourceMappingURL=userController.js.map