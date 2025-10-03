import express from 'express'
import { emailValid, passwordValid, register } from '../services/userService'
import { IUser } from '../models/userModel'
import { jsonResult } from '../models/result'
import { login } from '../services/userService'


const userRestController = express.Router()

// Register route
userRestController.post('/register', async  (req, res) => {
    const user = req.body as IUser
    const jsonResult = await register(user)
    res.status(jsonResult.code).json(jsonResult)
})

// Email validation route
userRestController.post('/emailValid', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await emailValid(user.email)
    res.status(jsonResult.code).json(jsonResult)
})

// Password validation route
userRestController.post('/passwordValid', (req, res) => {
    const user = req.body as IUser
    const jsonResult = passwordValid(user.password)
    res.status(jsonResult.code).json(jsonResult)
})




// Login route
userRestController.post('/login', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await login(user)
    res.status(jsonResult.code).json(jsonResult)
})

export default userRestController
