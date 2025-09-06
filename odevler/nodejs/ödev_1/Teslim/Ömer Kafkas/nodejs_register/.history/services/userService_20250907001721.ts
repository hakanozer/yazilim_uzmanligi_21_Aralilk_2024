import type { ILogin } from "../src/models/ILogin";

// Define or import the ILogin interface

export const userLogin = (user: ILogin) => {
    if (emailValid(user.email) && passwordValid(user.password)) {
        return true; // Valid credentials
    }
    return 'Email veya parola geçersiz'; // Invalid credentials - return descriptive error
}

export const emailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const passwordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}