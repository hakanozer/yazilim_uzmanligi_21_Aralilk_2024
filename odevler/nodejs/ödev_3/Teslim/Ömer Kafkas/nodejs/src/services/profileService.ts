import { Request } from "express";
import UserDB from "../models/userModel";
import { emailValid } from "./userService";
import { encrypt } from "../utils/cryptoJS";

export const profileUpdate = async (req: Request) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const oldUser = req.session.item;

   
    if (emailValid(email)) {
        oldUser.name = name;
        oldUser.email = email;
        try {
            await UserDB.updateOne(
                { _id: oldUser._id },
                {
                    $set: {
                        name: name,
                        email: email
                    }
                }
            );
            req.session.item = oldUser;
            return true;
        } catch (error) {
            return false;
        }
    }

   
    if (password && confirmPassword && password === confirmPassword) {
        const encryptedPassword = encrypt(password);
        try {
            await UserDB.updateOne(
                { _id: oldUser._id },
                {
                    $set: {
                        password: encryptedPassword
                    }
                }
            );
            oldUser.password = encryptedPassword;
            req.session.item = oldUser;
            return true;
        } catch (error) {
            return false;
        }
    }

    return false;
}