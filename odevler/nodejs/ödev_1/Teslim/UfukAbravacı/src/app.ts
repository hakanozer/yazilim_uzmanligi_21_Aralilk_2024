import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 3000

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