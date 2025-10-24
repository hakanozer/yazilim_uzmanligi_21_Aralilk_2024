import  express  from "express"
import type { ILogin } from "../models/ILogin.ts";
import { userLogin, userRegister } from "../services/userServices.ts";
import type { IRegister } from "../models/IRegister.ts";

export const userController = express.Router(); 


// userLogin
userController.get('/', (req,res) => {
    res.render('login', )
})

userController.post('/login', (req,res) => {
    const user:ILogin = req.body
    const isValid = userLogin(user)
    if(isValid === true) {
        res.redirect('/dashboard')
        
    }else {
        res.render('login', {error: isValid})
    }
})




