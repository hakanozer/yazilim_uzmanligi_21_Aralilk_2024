"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginForm = loginForm;
exports.login = login;
const authService_1 = require("../services/authService");
async function loginForm(req, res) {
    const success = typeof req.query.success === 'string' ? req.query.success : undefined;
    res.render('auth/login', { title: 'Giriş Yap', errors: [], values: {}, success });
}
// login(): JWT cookie yerine session’a kullanıcıyı yaz
async function login(req, res) {
    const { email, password } = req.body;
    const values = { email };
    try {
        const { user, token } = await (0, authService_1.loginUser)({ email, password });
        // Web oturumu: Kullanıcıyı session’a koy
        req.session.user = {
            sub: String(user._id),
            email: user.email,
            name: user.name,
            roles: user.roles,
            profilePicture: user.profilePicture
        };
        // JWT'yi cookie olarak ekle (API çağrıları için)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000
        });
        return res.redirect('/');
    }
    catch (err) {
        const status = err instanceof authService_1.AppError ? err.status : 500;
        const msg = err instanceof authService_1.AppError ? err.message : 'Beklenmeyen bir hata oluştu.';
        return res.status(status).render('auth/login', { title: 'Giriş Yap', errors: [msg], values });
    }
}
