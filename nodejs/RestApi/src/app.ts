import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { connectDB } from './configs/db';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from './utils/swaggerOptions';

// .env Config - .env file loading
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express()
const PORT = process.env.PORT || 4000
const url = `http://localhost:${PORT}`

// DB Config
connectDB()

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// import Rest Controllers
import userRestController from './restcontrollers/userRestController';
import categoryRestController from './restcontrollers/categoryRestController';
import commentRestController from './restcontrollers/commentRestController'; //eklendi (Ahmet Demircan)
import newsRestController from './restcontrollers/newsRestController';


// Routers Config
app.use('/api/v1/users', userRestController)
app.use('/api/v1/categories', categoryRestController)
app.use('/api/v1/comments', commentRestController)
app.use('/api/v1/news', newsRestController)

var options = {
  explorer: true
};
// swagger config
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));


app.listen(PORT, () => {
  console.log(`Server running: ${url}`)
})

