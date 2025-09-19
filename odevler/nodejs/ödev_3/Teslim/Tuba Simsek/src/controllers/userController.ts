import express  from "express"
import { userLogin, userLoginDb, userRegister, userRegisterDb } from "../services/userService"
import { IUser } from "../models/userModel"

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
userController.post('/login', async (req, res) => {
    const user:IUser = req.body // body-parser sayesinde form verilerini alabiliyoruz
    const isValid = userLogin(user)
    if (isValid === true) {
      const userLogin = await userLoginDb(user, req)
        if (userLogin === true) {
            res.redirect('/dashboard')
        }else {
            res.render('login', { error: userLogin })
        }
    } else {
        res.render('login', { error: isValid })
    }
})

userController.get('/logout', (req, res) => {
    req.session.destroy((err) => { // session nesnesi öldürüldü
        if (!err) {
            res.redirect('/')
        }
    })
})


// register sayfası için GET isteği
userController.get("/register", (req, res) => {
    res.render("register");
});


userController.post("/register", async (req, res) => {
    const user: IUser = req.body;
    const isValid = userRegister(user);
    if ( isValid === true ) {
        const registerDB = await userRegisterDb(user)
        if (registerDB === true) {
            res.redirect("/");
        } else {
            res.render("register", { error: registerDB });
        }
    } else {
        res.render("register", { error: isValid });
    }
});
