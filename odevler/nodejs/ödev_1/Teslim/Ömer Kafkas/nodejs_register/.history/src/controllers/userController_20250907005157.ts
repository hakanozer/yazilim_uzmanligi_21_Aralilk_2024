import express  from "express"
import { ILogin } from "../models/ILogin"
import { userLogin } from "../services/userService"

export const userController = express.Router()

// userLogin
userController.get("/", (req, res) => {
    res.render('login')
})

userController.post("/login", (req, res) => {
    const user: ILogin = req.body
    const isValid = userLogin(user)
    if(!isValid){
        res.render('login', {error: "Invalid credentials"})
    }
})

//user register
userController.get("/register", (req, res) => {
    res.render('register')
})

userController.post("/register", (req, res) => {
    const user: IRegister = req.body
    const isValid = userRegister(user)
    if(!isValid){
        res.render('register', {error: "Invalid credentials"})
    }
})
    res.render('login', {message: "Registration successful"})