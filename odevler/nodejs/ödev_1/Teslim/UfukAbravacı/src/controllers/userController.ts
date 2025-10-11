import express  from "express"
import { ILogin } from "../models/ILogin"
import { IRegister } from "../models/IRegister";
import { userLogin, userRegister } from "../services/userService"
import { error } from "console";

export const userController = express.Router()

// userLogin
userController.get("/", (req, res) => {
    res.render('login')
})

userController.post('/login', (req, res) => {
    const user:ILogin = req.body
    const isValid = userLogin(user)
    if (isValid === true) {
        res.redirect('/dashboard')
    } else {
        res.render('login', { error: isValid })
    }
})

//userRegister
userController.get("/register", (req, res) => {
    res.render("register", {error: null});
});


userController.post("/register", (req, res) => {
    const user: IRegister = req.body;
    const isValid = userRegister(user);
    if (isValid === true) {
        res.redirect("/");
    } else {
        res.render("register", { error: isValid });
    }
});