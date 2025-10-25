"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validators_1 = require("../utils/validators");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // unique zaten indeks oluşturur
        lowercase: true,
        trim: true,
        validate: { validator: validators_1.isValidEmail, message: 'Geçerli bir e-posta girin' }
    },
    password: {
        type: String,
        required: true,
        validate: { validator: validators_1.isValidPassword, message: 'Şifre en az 8 karakter olmalı' }
    },
    name: { type: String, trim: true },
    profilePicture: { type: String, default: '/images/default-avatar.svg' },
    roles: { type: [String], enum: ['user', 'admin', 'author'], default: ['user'], required: true }
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (err) {
        next(err);
    }
});
userSchema.methods.comparePassword = function (candidate) {
    return bcryptjs_1.default.compare(candidate, this.password);
};
userSchema.path('createdAt').immutable(true);
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.default = exports.User;
