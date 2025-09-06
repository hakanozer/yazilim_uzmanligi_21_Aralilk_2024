import express from 'express';
import { ILogin } from '../models/ILogin';

export const userController = express.Router()

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

console.log(user.email)
res.render('login')
} )