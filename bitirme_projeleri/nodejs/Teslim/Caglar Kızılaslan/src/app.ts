import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './Config/DB';
import { IUser } from './models/userModel';
import session from 'express-session';
import { globalFilter } from './utils/globalFilter';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// env Config - env file loading
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 4000;
const url = `http://localhost:${PORT}`;

// Session Config
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


// DB Connection
connectDB();

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// EJS Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// İmport Rest Controllers
import { userController } from './controllers/userController';
import { newsController } from './controllers/newsController';
import { apiController } from './controllers/apiController';
import { adminController } from './controllers/adminController';
import { authController } from './controllers/authController';


// Global Filter
app.use(globalFilter)


// Rauters Config
app.use("/", userController)
app.use('/register', userController)
app.use('/logout', userController)
app.use('/news', newsController)
app.use('/api', apiController)
app.use('/api/v1/auth', authController)
app.use('/admin', adminController)

//  routes
app.get('/login', (req, res) => res.render('login'))
app.get('/dashboard', (req, res) => res.redirect('/news/list'))
app.get('/posts/new', (req, res) => res.redirect('/news'))
app.get('/posts/:id', (req, res) => res.redirect(`/news/${req.params.id}`))

// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NewsHub API',
      version: '1.0.0',
      description: 'Haber & Blog Platformu API Dokümantasyonu',
    },
    servers: [
      {
        url: url,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'], // paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// server start
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
})
