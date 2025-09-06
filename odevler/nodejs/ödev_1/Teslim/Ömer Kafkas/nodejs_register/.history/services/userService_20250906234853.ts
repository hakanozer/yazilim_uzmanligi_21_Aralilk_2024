import { ILogin } from "../models/ILogin";

// Define or import the ILogin interface
export interface ILogin {
	
}

export const userLogin = (user: ILogin) => {
    

}

export const emailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const passwordValid = (password: String) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}