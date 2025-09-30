import { IResult, jsonResult } from "../models/result";
import UserDB, { IUser } from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../configs/auth";

export const register = async (user: IUser) => {
    // find user - email control
    const findUser = await UserDB.findOne({email: user.email})
    if(findUser) {
        return jsonResult(400, false, 'User already exists', user)
    } else {
        try {
            const bcryptPassword = await bcrypt.hash(user.password, 10)
            const newUser = new UserDB({...user, password: bcryptPassword})
            await newUser.save()
            return jsonResult(201, true, 'User created successfully', newUser)
        } catch (error) {
            return jsonResult(500, false, 'Internal server error', error.message)
        }
    }
}

export const login = async ( user: IUser) => {
    const findUser = await UserDB.findOne({email: user.email})
    if (findUser) {
        const checkPassword = await bcrypt.compare(user.password, findUser.password)
        if (checkPassword) {
            const token = jwt.sign({ id: findUser._id, email: findUser.email, roles: findUser.roles }, SECRET_KEY, { expiresIn: '1h' })
            findUser.jwt = token
            return jsonResult(200, true, 'Login successful', findUser)
        } else {
            return jsonResult(404, false, 'E-mail or Password is incorrect', user)
        }
    }else {
        return jsonResult(404, false, 'E-mail or Password is incorrect', user)
    }
}
