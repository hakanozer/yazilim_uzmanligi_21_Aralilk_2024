import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { connectDB } from './configs/db';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from './utils/swaggerOptions'
import { seedDefaultAdmin } from './utils/seedAdmin'

// .env Config - .env file loading
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express()
const PORT = process.env.PORT || 4000
const url = `http://localhost:${PORT}`
const API_BASE_URL = `${url}/api/v1`
const SWAGGER_URL = `${url}/api-docs`

// DB Config + Admin seed
connectDB()
  .then(() => seedDefaultAdmin())
  .catch(err => console.error('Seed admin error:', err))

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// import Rest Controllers
import userRestController from './restcontrollers/userRestController';
import projectRestController from './restcontrollers/projectRestController';
import taskRestController from './restcontrollers/taskRestController'


// Routers Config
app.use('/api/v1/users', userRestController)
app.use('/api/v1/projects', projectRestController)
app.use('/api/v1', taskRestController)

// swagger config
const swaggerDocs = swaggerJSDoc(swaggerOptions) as any;
swaggerDocs.servers = [{ url: API_BASE_URL }];
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server running: ${url}`)
  //console.log(`API base: ${API_BASE_URL}`)
  console.log(`Swagger docs: ${SWAGGER_URL}`)
})

