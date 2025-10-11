import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

const app= express()
const PORT= process.env.PORT || 3000

//body-parser config
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

//EJS Configuration

app.set("views", path.join(__dirname,"views"))
app.set("view engine","ejs")



//imports controllers
import { userController } from './controllers/userController'
import { dashboardController } from './controllers/dashboardController'
import { registerController } from './controllers/registerController'




//Controllers
app.use("/", userController)
app.use("/register",registerController)
app.use("/dashboard", dashboardController)





app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})
