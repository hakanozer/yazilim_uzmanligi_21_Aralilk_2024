import express  from "express"
import { ILogin } from "../models/ILogin"
import { userLogin, userRegisterDb } from "../../services/userService"


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
    res.render("register");
});


userController.post("/register", async (req, res) => {
    const user: IUser = req.body;
    const isValid = userRegister(user);
    if ( isValid === true ) {
        const registerDB = await userRegisterDb(user)
        if (registerDB === true) {
            res.redirect("/");
        } else {
            res.render("register", { error: registerDB });
        }
    } else {
        res.render("register", { error: isValid });
    }
});
