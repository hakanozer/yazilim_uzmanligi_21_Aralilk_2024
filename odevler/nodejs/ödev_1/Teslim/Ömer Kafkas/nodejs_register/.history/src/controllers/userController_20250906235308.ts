import { ILogin } from '../models/ILogin';
import { Router } from 'express';


export const userController = Router()

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
if(isValid){
    return res.render('login', {error: "Geçersiz email veya şifre"})
}

console.log(user.email, user.password)
res.render('login')
} )


function userLogin(user: ILogin): boolean {
    // Example validation: check if email and password are not empty
    if (!user.email || !user.password) {
        return false;
    }
    // Add your actual login logic here
    return true;
}

