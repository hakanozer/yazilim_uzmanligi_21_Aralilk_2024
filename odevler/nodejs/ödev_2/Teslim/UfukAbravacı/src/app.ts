import express from 'express'
import session from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'
import { connectDB } from './utils/db'
import { IUser } from './models/userModel'

const app = express()
const PORT = process.env.PORT || 3000

// Session Config
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
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// imports controllers
import { userController } from './controllers/userController'
import { dashboardController } from './controllers/dashboardController'




// Controllers
app.use("/", userController)
app.use("/dashboard", dashboardController)


app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})