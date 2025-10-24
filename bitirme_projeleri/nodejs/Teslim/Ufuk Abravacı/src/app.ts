import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/errorMiddleware';
// API Routes
import apiAuthRoutes from './routes/api/authRoutes';
import apiPostRoutes from './routes/api/postRoutes';
// Web Routes
import webAuthRoutes from './routes/web/authRoutes';
import webPostRoutes from './routes/web/postRoutes';
import webViewRoutes from './routes/web/viewRoutes';
//Swagger
import { setupSwagger } from './config/swagger';

const app = express();

// Veritabanı bağlantısı
connectDB();

// Middleware'ler
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: true, // ✅ true yap
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 saat
  }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Swagger setup
setupSwagger(app);

// API Routes
app.use('/api/v1/auth', apiAuthRoutes);
app.use('/api/v1/posts', apiPostRoutes);

// Web Routes  
app.use('/auth', webAuthRoutes);
app.use('/posts', webPostRoutes);
app.use('/', webViewRoutes);

// Error handler
app.use(errorHandler);

export default app;