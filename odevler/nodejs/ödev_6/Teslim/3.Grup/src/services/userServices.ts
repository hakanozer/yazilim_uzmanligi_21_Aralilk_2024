import { SECRET_KEY } from "../configs/auth";
import UserDB, { IUser } from "../models/userModel";
import { dataResult, IResult } from "./result";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (user: IUser) => {
    // find email-password user controller
    const findUser = await UserDB.findOne({email: user.email})
    if(findUser) {
        return dataResult(400,false, 'User already exists', user)
         } else {
        try {
        const bcryptPassword = await bcrypt.hash(user.password, 6)
        const newUser = new UserDB({...user, password: bcryptPassword})
        await newUser.save()
         return dataResult (201,true, 'User created successfully',newUser)
        } catch (error) {
            return dataResult(500,false,'Internal server error', error.message)
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
            return dataResult(200, true, 'Login successful', findUser)
        } else {
            return dataResult(404, false, 'E-mail or Password is incorrect', user)
        }
    }else {
        return dataResult(404, false, 'E-mail or Password is incorrect', user)
    }
}

// kullanıcı listesi (admin)
export const getAllUsers = async (user: IUser)=> {
    if(user.roles.includes('admin')) {
        const users = await UserDB.find()
        return dataResult(200, true, 'Users retrieved successfully', users)
    } else {
        return dataResult(403, false, 'Access denied', null)
    }

}
// role update (admin)
export const updateUserRole = async (id: string, roles: string[]): Promise<IResult> => {
    try {
        const user = await UserDB.findById(id);
        if (!user) {
            return dataResult(404, false, 'User not found', null);
        }
        user.roles = roles;
        await user.save();
        return dataResult(200, true, 'User roles updated successfully', user);
    } catch (error) {
        return dataResult(500, false, 'Internal server error', error.message);
    }
};


