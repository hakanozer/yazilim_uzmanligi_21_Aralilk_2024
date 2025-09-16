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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
exports.userController = express_1.default.Router();
// userLogin
exports.userController.get("/", (req, res) => {
    res.render('login');
});
exports.userController.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const isValid = (0, userService_1.userLogin)(user);
    if (isValid === true) {
        const userLogin = yield (0, userService_1.userLoginDb)(user, req);
        if (userLogin === true) {
            res.redirect('/dashboard');
        }
        else {
            res.render('login', { error: userLogin });
        }
    }
    else {
        res.render('login', { error: isValid });
    }
}));
exports.userController.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.redirect('/');
        }
    });
});
//userRegister
exports.userController.get("/register", (req, res) => {
    res.render("register");
});
exports.userController.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const isValid = (0, userService_1.userRegister)(user);
    if (isValid === true) {
        const registerDB = yield (0, userService_1.userRegisterDb)(user);
        if (registerDB === true) {
            res.redirect("/");
        }
        else {
            res.render("register", { error: registerDB });
        }
    }
    else {
        res.render("register", { error: isValid });
    }
}));
//# sourceMappingURL=userController.js.map