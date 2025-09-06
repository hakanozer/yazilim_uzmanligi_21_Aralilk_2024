import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 3000

// EJS Configuration
app.set("views", path.join(__dirname, "views")) //dirname ne demek? dir = directory(dizin) name yani içinde bulunduğumuz dizin
app.set("view engine", "ejs")

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: false })) // bu satır formdan gelen veriyi alabilmek için gerekli yani post methodu için
app.use(bodyParser.json()) // json formatında gelen veriyi alabilmek için gerekli

// import controllers
import { userController } from './controllers/userController'
import { dashboardController } from './controllers/dashboardController'
import { registerController } from './controllers/registerController'

// controllers
app.use("/", userController)
app.use("/dashboard", dashboardController)
app.use("/", registerController)

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})
