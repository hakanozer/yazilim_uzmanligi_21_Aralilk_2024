import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY!;

export const encrypt = (plainText: string): string => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, CRYPTO_SECRET_KEY).toString();
    return ciphertext;
}

export const decrypt = (cipherText: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipherText, CRYPTO_SECRET_KEY);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}