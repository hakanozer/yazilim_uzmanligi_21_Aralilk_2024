import CryptoJS from "crypto-js";

const extraKey = process.env.EXTRA_KEY || "extra_secret"; // .env içine de ekleyeceğiz

export const encrypt = (plainText: string) => {
  return CryptoJS.AES.encrypt(plainText, extraKey).toString();
};

export const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, extraKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};