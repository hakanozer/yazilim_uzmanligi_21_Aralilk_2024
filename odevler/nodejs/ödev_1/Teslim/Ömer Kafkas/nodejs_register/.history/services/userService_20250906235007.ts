import { ILogin } from "../models/ILogin";

// Define or import the ILogin interface

export const userLogin = (user: ILogin) => {
    if (emailValid(user.email) && passwordValid(user.password)) {
        return false; // Valid credentials
    }
    return true; // Invalid credentials
}

export const emailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const passwordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}