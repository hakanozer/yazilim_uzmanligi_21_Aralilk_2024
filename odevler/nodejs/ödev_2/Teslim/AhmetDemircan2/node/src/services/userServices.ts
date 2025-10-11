import UserDB, { IUser } from "../models/userModel";
import { decrypt, encrypt } from "../utils/cryptoJS";
import { Request } from "express";


export const userLogin = (user: IUser) : string | boolean => {
    if (!emailValid(user.email)) {
        return "Invalid email format";
    }
    if (!passwordValid(user.password)) {
        return "Password must be 6-10 characters long, include at least one uppercase letter, one number, and one special character.";
    }
    return true;
}

export const userLoginDb = async (user: IUser, req: Request) => {
    try {
      const dbUser = await UserDB.findOne({email: user.email })
      if (dbUser) {
        const plainPassword = decrypt(dbUser.password)
        if (plainPassword == user.password) {
            req.session.item = dbUser
            return true
        }else {
            return "Email or Password Fail"
        }
      }else {
        return "Email or Password Fail"
      }
    } catch (error) {
        console.error("userLoginDb error", error)
    }
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
Abc1d!
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


export const userRegister = (user: IUser) : string | boolean => {
    if (!user.name || user.name.trim().length < 3) {
        return "Full name must be at least 3 characters.";
    }else if (!emailValid(user.email)) {
        return "Invalid email format.";
    }else if (!passwordValid(user.password)) {
        return "Password must be 6-10 characters long, include at least one uppercase letter, one number, and one special character.";
    }
    return true
};

export const userRegisterDb = async (user: IUser) => {
    try {
        user.password = encrypt(user.password)
        const newUser = new UserDB(user);
        await newUser.save();
        return true;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("duplicate key error")) {
                return "Email already exists.";
            }
            return error.message;
        }
        return "An unknown error occurred.";
    }
}