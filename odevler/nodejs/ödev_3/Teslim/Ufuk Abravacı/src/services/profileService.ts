import { Request } from "express";
import UserDB from "../models/userModel";
import { emailValid, nameValid, passwordValid } from "./userService";
import { encrypt } from "../utils/cryptoJS";

export const profileUpdate = async (req: Request) => {
    const name = req.body.name
    const email = req.body.email
    const errors: string[] = []; //errorleri buraya pushlayacağız

    if (!nameValid(name)) {
        errors.push("Full name must be at least 3 characters long.");
    }

     if (!emailValid(email)) {
        errors.push("Invalid email format.");
    }

    if (errors.length > 0) {
        //error varsa erroru ve userı return ediyoruz.
        //profileError olarak dönmemin sebebi profil kısmındaki ve şifre kısmındaki errorleri birbirinde ayırabilmek.
        return { profileErrors: errors, user: { name, email } };
    }
     try {
        const oldUser = req.session.item;
        oldUser.name = name;
        oldUser.email = email;

        await UserDB.updateOne(
            { _id: oldUser._id },
            { $set: { name, email } }
        );

        req.session.item = oldUser;
        return { profileSuccess: "Profile updated successfully!", user: { name: oldUser.name, email: oldUser.email } };

    } catch (error) {
        console.error("profileUpdate error:", error);
        return { profileErrors: ["Update failed. Please try again later."], user: { name, email } };
    }
}
// Password değiştirme işlemi için ayrı bir metot kurguladım.
export const profilePasswordUpdate = async (req: Request) => {
    const password = req.body.password;
    const repassword = req.body.repassword;
    const errors: string[] = [];

    if (!password || !repassword) {
        errors.push("Password fields cannot be empty.");
    } else {
        if (!passwordValid(password)) {
            errors.push("Password must be 6-10 characters long, include at least one uppercase letter, one number, and one special character.");
        }
        if (password !== repassword) {
            errors.push("Passwords do not match.");
        }
    }

    if (errors.length > 0) {
        return { passwordErrors: errors };
    }

    try {
        const oldUser = req.session.item;
        const newEncrypted = encrypt(password);

        await UserDB.updateOne(
            { _id: oldUser._id },
            { $set: { password: newEncrypted } }
        );

        oldUser.password = newEncrypted;
        req.session.item = oldUser;

        return { passwordSuccess: "Password updated successfully!" };

    } catch (error) {
        console.error("profilePasswordUpdate error:", error);
        return { passwordErrors: ["Password update failed. Please try again later."] };
    }
};