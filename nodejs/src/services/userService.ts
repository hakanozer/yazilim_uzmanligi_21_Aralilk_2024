import { ILogin } from "../models/ILogin";

export const userLogin = (user: ILogin) : boolean => {
    if (!emailValid(user.email) || !passwordValid(user.password)) {
        return false;
    }
    return true;
}

export const emailValid = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

// min 6 karakter max 10
// 1 özel karakter
// 1 sayısal karakter
// 1 büyük karakter
export const passwordValid = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,10}$/;
    return regex.test(password);
}