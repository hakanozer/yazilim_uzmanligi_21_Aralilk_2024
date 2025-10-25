"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.authorizeRoles = authorizeRoles;
exports.registerForm = registerForm;
exports.register = register;
exports.authenticateJWT = authenticateJWT;
exports.authenticateWeb = authenticateWeb;
exports.attachUserToLocals = attachUserToLocals;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const validators_1 = require("../utils/validators");
function getJwtSecret() {
    const secret = process.env.JWT_SECRET || '';
    if (!secret) {
        throw new Error('JWT_SECRET .env içinde tanımlı olmalı');
    }
    return secret;
}
function signToken(user) {
    const roles = Array.isArray(user.roles)
        ? user.roles
        : user.role
            ? [user.role]
            : ['user'];
    const payload = {
        sub: String(user._id),
        roles,
        email: user.email
    };
    return jsonwebtoken_1.default.sign(payload, getJwtSecret(), { expiresIn: '1h' });
}
function authorizeRoles(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Yetkisiz: Kimlik doğrulama gerekli' });
        }
        const userRoles = Array.isArray(user.roles) ? user.roles : user.roles ? [user.roles] : [];
        const allowed = roles.some((r) => userRoles.includes(r));
        if (!allowed) {
            return res.status(403).json({ error: 'Erişim reddedildi: rol yetkisi yok' });
        }
        next();
    };
}
async function registerForm(req, res) {
    res.render('auth/register', { title: 'Kayıt Ol', errors: [], values: {} });
}
async function register(req, res) {
    const { email, password, name } = req.body;
    const errors = [];
    const values = { email, name };
    // Satır 68–69: validators.ts ile doğrulama
    if (!email || !(0, validators_1.isValidEmail)(email))
        errors.push('Geçerli bir e-posta girin.');
    if (!password || !(0, validators_1.isValidPassword)(password))
        errors.push('Şifre en az 8 karakter olmalı.');
    if (errors.length) {
        return res.status(400).render('auth/register', { title: 'Kayıt Ol', errors, values });
    }
    try {
        const exists = await userModel_1.default.findOne({ email });
        if (exists) {
            return res.status(409).render('auth/register', { title: 'Kayıt Ol', errors: ['Bu e-posta zaten kayıtlı.'], values });
        }
        await userModel_1.default.create({ email, password, name, roles: ['user'] });
        // İstersen burada login sayfasına yönlendirebiliriz.
        return res.status(201).render('auth/register', { title: 'Kayıt Ol', errors: [], values: {}, success: 'Kayıt başarılı! Giriş yapabilirsiniz.' });
    }
    catch (err) {
        return res.status(500).render('auth/register', { title: 'Kayıt Ol', errors: ['Beklenmeyen bir hata oluştu.'], values });
    }
}
// Web isteklerinden token çek (Authorization, Cookie veya query)
function getTokenFromRequest(req) {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer '))
        return auth.slice(7);
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        const m = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
        if (m)
            return decodeURIComponent(m[1]);
    }
    return undefined;
}
function authenticateJWT(req, res, next) {
    const token = getTokenFromRequest(req);
    if (!token) {
        return res.status(401).json({ error: 'Yetkisiz: token gerekli' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, getJwtSecret());
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
    }
}
// EJS sayfaları için koruma: yoksa login’e yönlendir
function authenticateWeb(req, res, next) {
    const sessionUser = req.session?.user;
    if (!sessionUser)
        return res.redirect('/auth/login');
    req.user = sessionUser;
    return next();
}
// Kullanıcıyı EJS locals’a ekle (menü koşulları için)
function attachUserToLocals(req, res, next) {
    const sessionUser = req.session?.user;
    if (sessionUser) {
        req.user = sessionUser;
        res.locals.user = sessionUser;
        return next();
    }
    // JWT fallback (API akışıyla uyum için)
    const token = getTokenFromRequest(req);
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, getJwtSecret());
            req.user = decoded;
            res.locals.user = decoded;
        }
        catch { /* geçersiz token: sessizce geç */ }
    }
    next();
}
