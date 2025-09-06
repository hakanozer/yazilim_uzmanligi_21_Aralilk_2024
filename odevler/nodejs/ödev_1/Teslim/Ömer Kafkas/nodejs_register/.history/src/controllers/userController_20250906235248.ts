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
    return res
}

console.log(user.email, user.password)
res.render('login')
} )


