import express from 'express';
import { userRegister } from '../services/userService';
import { IRegister } from '../models/IRegister';

export const registerController=express.Router()


registerController.get("/",(req ,res)=>{
    res.render("register")
})


registerController.post("/",(req,res)=>{
    const user:IRegister= req.body
    const isValid= userRegister(user)
    if(isValid===true){
        res.redirect("/")
    }else{
        res.render("register",{error: isValid})
    }
})