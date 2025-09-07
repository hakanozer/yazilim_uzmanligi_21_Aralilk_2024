import CryptoJS from "crypto-js";

export const encrypt = (plainText: string) => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, 'key123').toString();
    return ciphertext
} 