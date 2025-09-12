import express  from "express"
import { userLogin, userLoginDb, userRegister, userRegisterDb } from "../services/userServices"
import { IUser } from "../models/userModel"

export const userController = express.Router()

// userLogin
userController.get("/", (req, res) => {
    res.render('login')
})

userController.post('/login', async (req, res) => {
    const user:IUser = req.body
    const isValid = userLogin(user)
    if (isValid === true) {
        const userLogin = await userLoginDb(user, req)
        if (userLogin === true) {
            res.redirect('/dashboard')
        }else {
            res.render('login', { error: userLogin })
        }
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
    
    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
        return res.render("register", { error: "Passwords do not match." });
    }
    
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
