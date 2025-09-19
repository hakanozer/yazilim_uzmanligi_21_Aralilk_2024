import { Request } from "express";
import UserDB from "../models/userModel";
import { emailValid } from "./userService";
import bcrypt from "bcryptjs"; 

// bcryptjs nedir? şifreleri güvenli bir şekilde saklamak için kullanılır. cryptoJS.js dan 
// farkı nedir? bcryptjs tek yönlü şifreleme yapar, cryptoJS çift yönlü şifreleme yapar. bcryptjs daha güvenlidir.



export const profileUpdate = async (req: Request) : Promise<string | boolean> => { // string dönebilir veya true dönebilir
    const name = req.body.name?.trim() // bu kod kullanıcıdan gelen ismi alıp baştaki ve sondaki gereksiz boşlukları temizler
    const email = req.body.email?.trim()

    if (!name || name.length < 3) {
        return "Name must be at least 3 characters."
    }
    if (!emailValid(email)) {
        return "Invalid email format."
    }

    try {
        const oldUser = req.session.item
        oldUser.name = name
        oldUser.email = email

        await UserDB.updateOne(
            { _id: oldUser._id },
            { $set: { name: name, email: email } }
        );

        req.session.item = oldUser // güncellenmiş kullanıcıyı oturumda sakla
        return true
    } catch (error) {
        return "Profile update failed."
    }
};

// şifre güncelleme fonksiyonu
export const passwordUpdate = async (req: Request): Promise<string | boolean> => {
    const newPassword = req.body.newPassword?.trim();
    const confirmPassword = req.body.confirmPassword?.trim();

    if (!newPassword || !confirmPassword) {
        return "Password fields cannot be empty.";
    }
    if (newPassword.length < 6) {
        return "Password must be at least 6 characters.";
    }
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        return "Password must contain both letters and numbers.";
    }
    if (newPassword !== confirmPassword) {
        return "Passwords do not match.";
    }

    try {
        const oldUser = req.session.item;
        const hashed = await bcrypt.hash(newPassword, 10);

        await UserDB.updateOne(
            { _id: oldUser._id },
            { $set: { password: hashed } }
        );

        return true;
    } catch (error) {
        return "Password update failed.";
    }
};
