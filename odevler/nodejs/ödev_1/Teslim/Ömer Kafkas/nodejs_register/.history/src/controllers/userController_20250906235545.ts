import { ILogin } from '../models/ILogin';
import e, { Router } from 'express';


export const userController = express.Router();
import { userLogin } from '../../services/userService';

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
res.redirect('/dashboard')

})