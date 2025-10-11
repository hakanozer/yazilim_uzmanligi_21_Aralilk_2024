import { ILogin } from '../models/ILogin';
import express, { Router } from 'express';
import { userLogin } from '../../services/userService';


export const userController = express.Router();


const userObj = {
    id:150,
    name: "Erkan",
    surname: "Bilmesin"
}

//userLogin

userController.get("/", (req, res) => {
	res.render('login')
})

userController.post('/login', (req, res) => {
const user: ILogin = req.body
const isValid = userLogin(user)
if(!isValid){
    return res.render('login', {error: "Geçersiz email veya şifre"})
}
//res.redirect('/dashboard')

})