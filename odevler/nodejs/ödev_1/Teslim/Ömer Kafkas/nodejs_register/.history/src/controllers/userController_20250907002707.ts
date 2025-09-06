import express  from "express"
import { ILogin } from "../models/ILogin"
import { userLogin } from "../services/userService"


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