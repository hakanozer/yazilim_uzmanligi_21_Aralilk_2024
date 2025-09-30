import express from 'express'
import {login, register} from '../services/userService'
import { IUser } from '../models/userModel'
const userRestController = express.Router()

userRestController.post('/register', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await register(user)
    res.status(jsonResult.code).json(jsonResult)
})

userRestController.post('/login', async (req, res) => {
    const user = req.body as IUser
    const jsonResult = await login(user)
    res.status(jsonResult.code).json(jsonResult)
})

export default userRestController
