import express  from "express"

export const userController = express.Router()

const userObj = {
    id: 150,
    name: 'Erkan',
    surname: 'Bilsin'
}
const arr = [
    "İstanbul", "Ankara", "İzmir", "Bursa"
]
// userLogin
userController.get("/", (req, res) => {
    res.render('login', {
        title: 'User Loginx', 
        cat: 100, 
        user: userObj,
        cities: arr
    })
})
