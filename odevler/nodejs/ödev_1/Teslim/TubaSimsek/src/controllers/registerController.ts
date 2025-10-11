import express from "express"
import { IRegister } from "../models/IRegister"
import { userRegister } from "../services/userService"

export const registerController = express.Router()

// GET - sayfa açma
registerController.get("/register", (req, res) => {
    res.render("register")
})

// POST - form gönderme
registerController.post("/register", (req, res) => {
    const user: IRegister = req.body
    const result = userRegister(user)

    if (result === true) {
        // başarılı ise dashboard veya login sayfasına yönlendir
        res.redirect("/login")
    } else {
        // hata varsa register sayfasına hata mesajı ile dön
        res.render("register", { error: result })
    }
})
