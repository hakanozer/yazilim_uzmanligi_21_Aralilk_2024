import express  from "express"
import { ILogin } from "../models/ILogin"
import { userLogin } from "../services/userService"

// Yeni bir Router objesi oluşturuyorsun
export const userController = express.Router()

// GET isteği: kullanıcı login sayfasını görmek isterse
// userLogin
userController.get("/", (req, res) => {
    res.render('login', {
         // login.ejs gibi bir template dosyasını render eder
    })
})

// POST isteği: kullanıcı formu doldurup gönderirse
userController.post("/login", (req, res) => {
    const user:ILogin = req.body // body-parser sayesinde form verilerini alabiliyoruz
    const isValid = userLogin(user)
    if (isValid === true) {
        res.redirect('/dashboard')
    } else {
    res.render('login', { error: isValid })  
    }
})

// register sayfası için GET isteği
userController.get("/register", (req, res) => {
    res.render("register");
});

