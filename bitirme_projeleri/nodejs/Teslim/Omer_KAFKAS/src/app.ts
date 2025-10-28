import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'
import session from 'express-session'
import expressLayouts from 'express-ejs-layouts'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import authRoutes from './routes/authRoutes'
import newsRoutes from './routes/newsRoutes'
import commentRoutes from './routes/commentRoutes'
import adminRoutes from './routes/adminRoutes'
import viewRoutes from './routes/viewRoutes'

// .env Config - .env file loading
dotenv.config({path: path.resolve(__dirname, '../.env')});

const app = express()

// View Engine (EJS) Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Static Files Config
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Uploaded files

// body-parser Config
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Session Configuration (EJS için)
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gün
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // Production'da HTTPS zorunlu
    }
}));

// Session'a user bilgisini ekle (her istekte kullanılabilir)
declare module 'express-session' {
    interface SessionData {
        userId?: string;
        user?: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
    }
}

// Debug Middleware - Her isteği logla
app.use((req, res, next) => {
    console.log(`🌐 ${req.method} ${req.path}`);
    next();
});

// Swagger API Documentation
// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'NewsHub API Docs'
}));

// API Routers Config
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// View Routers Config (Frontend)
app.use('/', viewRoutes);

// Global Error Handler (En sonda olmalı)
import { globalErrorHandler, notFoundHandler } from './middlewares/errorHandler';
app.use(notFoundHandler); // 404 handler
app.use(globalErrorHandler); // Error handler

export { app };


