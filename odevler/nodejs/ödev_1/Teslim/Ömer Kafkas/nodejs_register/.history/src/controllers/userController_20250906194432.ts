import express from 'express';

export const userController = express.Router()

const userObj = {
    id:150,
    name: Erkan,
    surname: 
}

//userLogin

userController.get("/", (req, res) => {
	res.render('login', {title: 'User Login', cat: 100})
})