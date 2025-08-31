import { ILogin } from "../models/ILogin";

export const userLogin = (user: ILogin) : string | boolean => {
    if (!emailValid(user.email)) {
        return "Invalid email format";
    }
    if (!passwordValid(user.password)) {
        return "Password must be 6-10 characters long, include at least one uppercase letter, one number, and one special character.";
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
/*
Abc1!d
Xyz9#Q
Qwert7*
Java8@A
Code1$X
Train9%T
 */
export const passwordValid = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,10}$/;
    return regex.test(password);
}