import { ILogin } from "../models/ILogin";
import { IRegister } from "../models/IRegister"

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
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email)

}

// min 6 karakter max 10 karakter
// 1 özel karakter
// 1 sayısal karakter
// 1 büyük harf
export const passwordValid = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/
    return regex.test(password)

}


// register kontrol fonksiyonu
export const userRegister = (user: IRegister): true | string => {
    if (!user.adSoyad || !user.email || !user.password) {
        return "All fields are required"
    }
    if (!user.email.includes("@")) {
        return "Invalid email format"
    }
    if (user.password.length < 6) {
        return "Password must be at least 6 characters"
    }

 
    return true
}