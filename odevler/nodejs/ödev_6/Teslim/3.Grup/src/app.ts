import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { connectDB } from './configs/db';
import userRestController from './controllers/userRestControllers';
import taskController from './controllers/taskController'; 
import projectController from './controllers/projectController';
import swaggerUi from 'swagger-ui-express';
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



// Routers Config
app.use('/api/users', userRestController)
app.use('/api/tasks', taskController)
app.use('/api/projects', projectController)


// swagger Config

var options = {explorer: true};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs,options));

// Server Running
app.listen(PORT, () => {
  console.log(`Server running: ${url}`)
})

