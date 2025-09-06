import express from 'express';

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
    const user = req.body
    console.log()
} )