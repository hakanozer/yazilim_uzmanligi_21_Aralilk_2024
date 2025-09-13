import CryptoJS from "crypto-js";

// Encrypt - şifreleme
export const encrypt = (plainText: string) => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, 'key123').toString();
    return ciphertext
}

// Decrypt - şifre çözme
export const decrypt = (cipherText: string) => { //cipherText = şifreli metin 
    const bytes = CryptoJS.AES.decrypt(cipherText, 'key123');
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}