import express  from "express"
import { ILogin } from "../models/ILogin"
import { userLogin } from "../services/userService"

export const userController = express.Router()

// userLogin
userController.get("/", (req, res) => {
    res.render('login')
})

userController.post('/login', (req, res) => {
    const user:ILogin = req.body
    const isValid = userLogin(user)
    if (!isValid) {
        res.render('login', { error: "Invalid email or password" })
    }
    //res.redirect('/dashboard')
})
