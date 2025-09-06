"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordvalid = exports.emailvalid = exports.userLogin = void 0;
const userLogin = (user) => {
    if (!(0, exports.emailvalid)(user.email) || !(0, exports.passwordvalid)(user)) {
        throw new Error('Email or password is not valid');
    }
    return true;
};
exports.userLogin = userLogin;
const emailvalid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
exports.emailvalid = emailvalid;
// min 6 karakter ve max 15 karakter
// 1 özel karakter
// 1 sayısal karakter
// 1 büyük karakter
const passwordvalid = (user) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    return passwordRegex.test(user.password);
};
exports.passwordvalid = passwordvalid;
//# sourceMappingURL=userService.js.map