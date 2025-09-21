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
exports.userRegisterDb = exports.userRegister = exports.passwordValid = exports.emailValid = exports.userLoginDb = exports.userLogin = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const cryptoJS_1 = require("../utils/cryptoJS");
const userLogin = (user) => {
    if (!(0, exports.emailValid)(user.email)) {
        return "Invalid email format";
    }
    if (!(0, exports.passwordValid)(user.password)) {
        return "Password must be 6-10 characters long, include at least one uppercase letter, one number, and one special character.";
    }
    return true;
};
exports.userLogin = userLogin;
const userLoginDb = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUser = yield userModel_1.default.findOne({ email: user.email });
        if (dbUser) {
            const plainPassword = (0, cryptoJS_1.decrypt)(dbUser.password);
            if (plainPassword == user.password) {
                req.session.item = dbUser;
                return true;
            }
            else {
                return "Email or Password Fail";
            }
        }
        else {
            return "Email or Password Fail";
        }
    }
    catch (error) {
        console.error("userLoginDb error", error);
    }
});
exports.userLoginDb = userLoginDb;
const emailValid = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};
exports.emailValid = emailValid;
// min 6 karakter max 10
// 1 özel karakter
// 1 sayısal karakter
// 1 büyük karakter
/*
Abc1d!
Xyz9#Q
Qwert7*
Java8@A
Code1$X
Train9%T
 */
const passwordValid = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,10}$/;
    return regex.test(password);
};
exports.passwordValid = passwordValid;
const userRegister = (user) => {
    if (user.name != '' && user.name.length < 3) {
        return "Full name must be at least 3 characters.";
    }
    else if (!(0, exports.emailValid)(user.email)) {
        return "Invalid email format.";
    }
    else if (!(0, exports.passwordValid)(user.password)) {
        return "Password must be 3-15 characters long, include at least one uppercase letter, one number, and one special character.";
    }
    return true;
};
exports.userRegister = userRegister;
const userRegisterDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user.password = (0, cryptoJS_1.encrypt)(user.password);
        const newUser = new userModel_1.default(user);
        yield newUser.save();
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("duplicate key error")) {
                return "Email already exists.";
            }
            return error.message;
        }
        return "An unknown error occurred.";
    }
});
exports.userRegisterDb = userRegisterDb;
//# sourceMappingURL=userService.js.map