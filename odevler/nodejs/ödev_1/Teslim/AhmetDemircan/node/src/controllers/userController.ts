import express  from "express"
import { ILogin } from "../models/ILogin"
import { IRegister } from "../models/IRegister"
import { userLogin } from "../services/userServices"
import { userRegister } from "../services/userServices"

export const userController = express.Router()

const userObj = {
    id: 150,
    name: 'Erkan',
    surname: 'Bilsin'
}
const arr = [
    "İstanbul", "Ankara", "İzmir", "Bursa"
]
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

// userRegister
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