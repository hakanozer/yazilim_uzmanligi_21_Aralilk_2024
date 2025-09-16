import { Request } from "express";
import UserDB from "../models/userModel";
import { emailValid, nameValid, passwordValid } from "./userService";

export const profileUpdate = async (req: Request) => {
    const name = req.body.name
    const email = req.body.email
    const Password = req.body.Password
    
    // Email validasyonu
    if (!emailValid(email)) {
        return "Invalid email format.";
    }
    
    // Name validasyonu
    const nameValidation = nameValid(name);
    if (nameValidation !== true) {
        return nameValidation;
    }

    //Password validasyonu
    const passwordValidation = passwordValid(Password);
    if (passwordValidation !== true) {
        return passwordValidation;
    }
    
    const oldUser = req.session.item
    oldUser.name = name
    oldUser.email = email
    oldUser.password = Password
    try {
        await UserDB.updateOne(
            { _id: oldUser._id },
            {
                $set: {
                    name: name,
                    email: email,
                    password: Password
                }
            }
        )
        req.session.item = oldUser
        
        return true
    } catch (error) {
        return "Database update failed.";
    }
}