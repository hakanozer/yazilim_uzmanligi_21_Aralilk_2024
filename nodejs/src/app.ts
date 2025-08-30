import express from 'express'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3000

// EJS Configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// imports controllers
import { userController } from './controllers/userController'

// user controller
app.use("/", userController)

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})
