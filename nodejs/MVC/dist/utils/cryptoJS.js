"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const encrypt = (plainText) => {
    const ciphertext = crypto_js_1.default.AES.encrypt(plainText, 'key123').toString();
    return ciphertext;
};
exports.encrypt = encrypt;
const decrypt = (cipherText) => {
    const bytes = crypto_js_1.default.AES.decrypt(cipherText, 'key123');
    const plainText = bytes.toString(crypto_js_1.default.enc.Utf8);
    return plainText;
};
exports.decrypt = decrypt;
//# sourceMappingURL=cryptoJS.js.map