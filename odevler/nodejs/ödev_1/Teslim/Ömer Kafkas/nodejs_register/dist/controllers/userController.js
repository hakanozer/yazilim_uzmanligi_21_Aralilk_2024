"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
exports.userController = express_1.default.Router();
const userObj = {
    id: 150,
    name: 'Erkan',
    surname: 'Bilsin'
};
const arr = [
    "İstanbul", "Ankara", "İzmir", "Bursa"
];
// userLogin
exports.userController.get("/", (req, res) => {
    res.render('login');
});
exports.userController.post("/login", (req, res) => {
    const user = req.body;
    const isValid = (0, userService_1.userLogin)(user);
    if (!isValid) {
        res.render('login', { error: "Invalid credentials" });
    }
});
//# sourceMappingURL=userController.js.map