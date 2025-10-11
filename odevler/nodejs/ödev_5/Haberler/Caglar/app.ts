import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { connectDB } from './configs/db';

// .env Config - .env file loading
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express()
const PORT = process.env.PORT || 4000

// DB Config
connectDB()

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// import Rest Controllers
import userRestController from './restcontrollers/userRestController';
import categoryRestController from './restcontrollers/categoryRestController';
import newsRestController from './restcontrollers/newsRestController';


// Routers Config
app.use('/api/users', userRestController)
app.use('/api/categories', categoryRestController)
app.use('/api/news', newsRestController)


app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
})

