import { json } from "body-parser";
import { IResult, jsonResult } from "../models/result";
import UserDB, { IUser } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../configs/auth";

// register fonkisyonunda önce user modelini tanımla ve türünü belirle
export const register = async (user: IUser) =>  {
    // find user - email control
    const findUser = await UserDB.findOne({email: user.email})
    if(findUser) {
        return jsonResult(400, false, "User already exists", user)
    } else {
        try {
        const bcryptPassword = await bcrypt.hash(user.password, 10)
        const newUser = new UserDB({...user,password: bcryptPassword}) //...user demek user objesinin içindeki tüm elemanları al demek
        await newUser.save()
        return jsonResult(201, true, "User created successfully", newUser)
        } catch (error) {
        return jsonResult(500, false, "Internal server error", error.message)
        }
    }
 }

 export const login = async (user: IUser) => {
    const findUser = await UserDB.findOne({email: user.email})
    if(findUser) {
    const checkPassword = await bcrypt.compare(user.password, findUser.password)
    if(checkPassword) {
        const token = jwt.sign({id: findUser._id, email: findUser.email, roles: findUser.roles}, SECRET_KEY, {expiresIn: '1h'})
        findUser.jwt = token // burada jwt oluşacak.
        return jsonResult(200, true, "Login successful", findUser)
    } else {
        return jsonResult(404, false, "E-mail or password is incorrect", user)
    }
 } else {
     return jsonResult(404, false, "E-mail or password is incorrect", user)
 }
}
// email ve password validasyon fonksiyonları
export const emailValid = async (email:string) => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)) {
        return jsonResult(400, false, "Invalid email format", email)
    }
    const findUser = await UserDB.findOne({email: email})
    if(findUser) {
        return jsonResult(400, false, "Email already exists", email)
    }
    return jsonResult(200, true, "Email is valid", email)


}
// password en az 8 karakter, en az bir büyük harf, en az bir küçük harf, en az bir rakam ve en az bir özel karakter içermeli
export const passwordValid = (password:string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!passwordRegex.test(password)) {
        return jsonResult(400, false, "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character", password)
    }
    return jsonResult(200, true, "Password is valid", password)
}

const checkEmail = async (email) => {
    const response = await fetch('/emailValid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
    return response.json()
}

const checkPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!passwordRegex.test(password)) {
        return {code: 400, success: false, message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character", data: password}
    }
    return {code: 200, success: true, message: "Password is valid", data: password}
}

export default {register, login, emailValid, passwordValid, checkEmail, checkPassword}




