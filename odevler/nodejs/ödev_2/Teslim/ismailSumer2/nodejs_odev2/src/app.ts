import express from 'express'
import session from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'
import { connectDB } from './utils/db'
import { IUser } from './models/userModels'

const app = express()
const PORT = process.env.PORT || 3000


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

/
connectDB()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


import { userControllers } from './controlles/userControlles'
import { dashboardController } from './controlles/dashboardcontrolles'





app.use("/", userControlles)
app.use("/dashboard", dashboardController)


app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})