import CryptoJS from "crypto-js";

const extraKey = process.env.extraKey;

export const encrypt = (plainText: string) => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, extraKey).toString();
    return ciphertext
}

export const decrypt = (cipherText: string) => {
    const bytes  = CryptoJS.AES.decrypt(cipherText, extraKey);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}