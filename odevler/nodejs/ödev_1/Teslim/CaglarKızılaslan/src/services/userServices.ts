import type { ILogin } from "../models/ILogin.ts";
import type { IRegister } from "../models/IRegister.ts";

// servis email ve password denetimi sağlar-kurallarını belirler

export const surnameValid = (surname: string) => {
    const regex = /^[A-Za-z\u00C0-\u017F\s]+$/;
    return regex.test(surname);

}

export const lastnameValid = (lastname: string) => {
    const regex = /^[A-Za-z\u00C0-\u017F\s]+$/;
    return regex.test(lastname);

}



export const emailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

}
// 6 karakter
// 1 özel karakter
// 1 sayısal karakter
// 1 büyük karakter
export const passwordValid = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return regex.test(password)
}


//User Login servis

export const userLogin = (user: ILogin) : string | boolean => {
    if(!emailValid(user.email)) {
        return "Invalid email format";
    }
    if(!passwordValid(user.password)) {
        return "Password must be 6-10 characters long, include at least one upper";
    }
    
    return true;
    
}

// User Register servis

export const userRegister = (user:IRegister) : string | boolean => {
    if(!surnameValid(user.surname)) {
        return "Name must contain only letters";
    }
    if(!surnameValid(user.lastname)) {
        return "Surname must contain only letters";
    }
    if(!emailValid(user.email)) {
        return "Invalid email format";
    }
    if(!passwordValid(user.password)) {
        return "Password must be 6-10 characters long, include at least one upper";
    }
    
    return true;

}


