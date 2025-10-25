"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
exports.isValidPassword = isValidPassword;
exports.makeSafeRegex = makeSafeRegex;
function isValidEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}
function isValidPassword(password) {
    return typeof password === 'string' && password.length >= 8;
}
function makeSafeRegex(input, flags = 'i') {
    const escaped = String(input).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped, flags);
}
