import { decrypt, encrypt } from "../config/cryptoJS.ts";
import type { IUser } from "../models/userModel.ts";
import UserDB from "../models/userModel.ts";
import type { Request } from "express";

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

export const passwordValid = (password: string) => {
    const regex = /^(?=.*[A-Z]).{6,10}$/;
    return regex.test(password);
}


//User Login servis

export const userLogin = (user: IUser) : string | boolean => {
    if(!emailValid(user.email)) {
        return "Invalid email format";
    }
    if(!passwordValid(user.password)) {
        return "Password must be 6-10 characters long, include at least one upper";
    }
    
    return true;
    
}

export const userLoginDb = async (user:IUser, req:Request)  => {
    try {
      const dbUser = await UserDB.findOne({email: user.email})
      if (dbUser) {
        const plainPassword = decrypt(dbUser.password)
        if (plainPassword === user.password) {
            req.session.item = dbUser
            return true
        }else {
        return "Email or Password Fail"
      }
      }else {
        return "Email or Password Fail"
      }
    } catch (error) {
        console.error("userLoginDb", error)
    }
}

// User Register servis

export const userRegister =  (user:IUser) : string | boolean => {
    if(!surnameValid(user.surname)) {
        return "Surname must contain only letters";
    } else if(!lastnameValid(user.lastname)) {
        return "Lastname must contain only letters";
    } else if(!emailValid(user.email)) {
        return "Invalid email format";
    } else if(!passwordValid(user.password)) {
        return "Password must be 6-10 characters long, include at least one upper";
    }
    return true;
};

export const userRegisterDb = async (user: IUser) => {
    try {
        user.password = encrypt(user.password)
        const newUser = new UserDB(user);
        await newUser.save();
        return true;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('duplicate key error')) {
                return "Email already exists.";
            }
            return error.message
        }
        return "An unknown error occurred."
    }
}



