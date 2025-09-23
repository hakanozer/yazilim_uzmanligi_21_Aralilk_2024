import { Request } from "express";
import UserDB from "../models/userModel";
import { emailValid, nameValid, passwordValid } from "./userService";
import { encrypt } from "../utils/cryptoJS";


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
    if (!passwordValidation) {
        //console.log('passwordValidation' + Password);
        //throw new Error('Password must be 6-10 characters long, include at least one uppercase letter, one number, and one special character.');
        return 'Şifreniz geçersiz. Şifreniz 6-10 karakter uzunluğunda olmalı, en az bir büyük harf, bir rakam ve bir özel karakter (!@#$%^&*) içermelidir.';
    }
    
    const oldUser = req.session.item
    oldUser.name = name
    oldUser.email = email
    oldUser.password = Password
    console.log(Password);
    try {
        await UserDB.updateOne(
            { _id: oldUser._id },
            {
                $set: {
                    name: name,
                    email: email,
                    password: encrypt (Password)
                }
            }
        )
        req.session.item = oldUser
        console.log('Profile updated successfully.');
        return true
    } catch (error) {
        return "Database update failed.";
    }
}