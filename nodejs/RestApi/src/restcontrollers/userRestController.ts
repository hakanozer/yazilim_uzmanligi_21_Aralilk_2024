import express from 'express'

const userRestController = express.Router()

userRestController.get('/login', (req, res) => {
    const sendObj = {
        id: 100,
        name: "Ali Bilmem",
        email: "ali@mail.com"
    }
    res.json(sendObj)
})

export default userRestController
