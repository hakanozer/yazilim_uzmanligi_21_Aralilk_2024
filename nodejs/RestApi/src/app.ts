import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'


// .env Config - .env file loading
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express()
const PORT = process.env.PORT || 4000

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// import Rest Controllers
import userRestController from './restcontrollers/userRestController';

// Routers Config
app.use('/api/users', userRestController)


app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})

