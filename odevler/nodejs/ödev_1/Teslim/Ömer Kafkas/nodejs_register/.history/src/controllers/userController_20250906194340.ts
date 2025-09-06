import express from 'express';

export const userController = express.Router()

co

//userLogin

userController.get("/", (req, res) => {
	res.render('login', {title: 'User Login', cat: 100})
})