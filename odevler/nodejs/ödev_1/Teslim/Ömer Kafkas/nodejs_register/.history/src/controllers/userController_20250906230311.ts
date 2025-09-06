import express from 'express';
import { ILogin } from '../models/ILogin';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';

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

console.log(user.email, user.password)
res.render('login')
} )

userController.post('/register',
  body('email').isEmail().withMessage('Geçerli bir email giriniz'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalı'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Kayıt işlemleri...
    res.send('Kayıt başarılı!');
  }
);