import { Request } from "express";
import UserDB from "../models/userModel";
import { emailValid } from "./userService";

export const profileUpdate = async (req: Request) => {
    const name = req.body.name
    const email = req.body.email
    if(emailValid(email)) {
        const oldUser = req.session.item
        oldUser.name = name
        oldUser.email = email
        try {
            await UserDB.updateOne(
                { _id: oldUser._id },
                {
                    $set: {
                        name: name,
                        email: email
                    }
                }
            )
            req.session.item = oldUser
            
            return true
        } catch (error) {
            return false
        }
    }
}