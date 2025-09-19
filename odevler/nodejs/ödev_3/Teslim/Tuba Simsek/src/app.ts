import express from 'express'
import session from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'
import { connectDB } from './utils/db'
import { IUser } from './models/userModel'
import { globalFilter } from './utils/globalFilter'


const app = express()
const PORT = process.env.PORT || 3000


//session config
declare module 'express-session' {
    interface SessionData {
      item: IUser
    }
}
const sessionConfig = session({
    secret: 'key123',
    resave: false,
    saveUninitialized: true

})
app.use(sessionConfig)


// DB Config
connectDB()

// EJS Configuration
app.set("views", path.join(__dirname, "views")) //dirname ne demek? dir = directory(dizin) name yani içinde bulunduğumuz dizin
app.set("view engine", "ejs")

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: false })) // bu satır formdan gelen veriyi alabilmek için gerekli yani post methodu için
app.use(bodyParser.json()) // json formatında gelen veriyi alabilmek için gerekli

// import controllers
import { userController } from './controllers/userController'
import { dashboardController } from './controllers/dashboardController'
import { profileController } from './controllers/profileController'

// Global Filter
app.use(globalFilter) 
 

// controllers
app.use("/", userController)
app.use("/dashboard", dashboardController)
app.use("/profile", profileController)

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})
