import express from "express"
import type { IRegister } from "../models/IRegister.ts";
import { userRegister } from "../services/userServices.ts";

export const userRegisterController = express.Router();

userRegisterController.get('/', (req,res) => {
    res.render('register')
})

// userRegister
userRegisterController.post('/', (req,res) => {
    const user:IRegister = req.body
    const isValid = userRegister(user)
    if(isValid === true) {
        res.redirect('/')
    }else {
        res.render('register', {error: isValid})
    }
})