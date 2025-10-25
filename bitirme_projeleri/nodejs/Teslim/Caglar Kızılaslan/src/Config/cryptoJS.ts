import CryptoJS from "crypto-js";


export const encrypt = (plainText: string) => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, 'key 123').toString();
    return ciphertext;
}

export const decrypt = (cipherText: string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, 'key 123');
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}