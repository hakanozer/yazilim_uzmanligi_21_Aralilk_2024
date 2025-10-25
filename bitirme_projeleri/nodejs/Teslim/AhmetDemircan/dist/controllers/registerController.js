"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForm = registerForm;
exports.register = register;
const authService_1 = require("../services/authService");
async function registerForm(req, res) {
    res.render('auth/register', { title: 'Kayıt Ol', errors: [], values: {} });
}
async function register(req, res) {
    const { email, password, name } = req.body;
    const values = { email, name };
    try {
        await (0, authService_1.registerUser)({ email, password, name });
        return res.redirect(`/auth/login?success=${encodeURIComponent('Kayıt başarılı! Giriş yapabilirsiniz.')}`);
    }
    catch (err) {
        const status = err instanceof authService_1.AppError ? err.status : 500;
        const msg = err instanceof authService_1.AppError ? err.message : 'Beklenmeyen bir hata oluştu.';
        return res.status(status).render('auth/register', { title: 'Kayıt Ol', errors: [msg], values });
    }
}
