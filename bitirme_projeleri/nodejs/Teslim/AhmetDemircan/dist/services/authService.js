"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const userModel_1 = __importDefault(require("../models/userModel"));
const validators_1 = require("../utils/validators");
const authController_1 = require("../controllers/authController");
class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.AppError = AppError;
async function registerUser(input) {
    const { email, password, name } = input;
    if (!email || !(0, validators_1.isValidEmail)(email))
        throw new AppError(400, 'Geçerli bir e-posta girin.');
    if (!password || !(0, validators_1.isValidPassword)(password))
        throw new AppError(400, 'Şifre en az 8 karakter olmalı.');
    const exists = await userModel_1.default.findOne({ email });
    if (exists)
        throw new AppError(409, 'Bu e-posta zaten kayıtlı.');
    const created = await userModel_1.default.create({ email, password, name, roles: ['user'] });
    return created;
}
async function loginUser(input) {
    const { email, password } = input;
    if (!email || !(0, validators_1.isValidEmail)(email) || !password)
        throw new AppError(400, 'Geçerli bir e-posta ve şifre girin.');
    const user = await userModel_1.default.findOne({ email });
    const ok = user && (await user.comparePassword(password));
    if (!ok || !user)
        throw new AppError(401, 'E-posta veya şifre hatalı.');
    const token = (0, authController_1.signToken)(user);
    return { user, token };
}
