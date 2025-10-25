import  express  from "express";
import { userLogin, userLoginDb, userRegister, userRegisterDb } from "../services/userServices";
import { IUser } from "../models/userModel";
import { error } from "console";

export const userController = express.Router();


userController.get("/", (req,res) => {
    res.render('login')
})


userController.post('/login',async  (req,res) => {
    const user:IUser = req.body
    const isValid = userLogin(user)
    if(isValid === true) {
        const userLogin = await userLoginDb(user,req)
        if (userLogin === true) {
            res.redirect('/news')
        }else {
            res.render('login', {error: userLogin})
        }
    }else {
        res.render('login', {error: isValid})
    }
   
})


userController.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err)
        }
        res.redirect('/')
    })
})


userController.get('/register', (req,res) => {
    res.render('register')
})


userController.post('/register', async (req,res) => {
    const user:IUser = req.body
    const isValid = userRegister(user)
    if(isValid === true) {
        const registerDB = await userRegisterDb(user)
        if(registerDB === true) {
            res.redirect('/')
        } else {
            res.render('register', {error: registerDB});
        }
    }else {
        res.render('register', {error: isValid})
    }
})