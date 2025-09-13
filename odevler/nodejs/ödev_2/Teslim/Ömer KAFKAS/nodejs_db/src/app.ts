import express from 'express';
import session from 'express-session';
import path from 'path';
import { connectDB } from './utils/db';
import { IUser } from './models/userModel';
import { userController } from './controllers/userController';
import { dashboardController } from './controllers/dashboardController';

const app = express();
const PORT = process.env.PORT || 3000;

declare module 'express-session' {
  interface SessionData {
    item: IUser
  }
}
const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'key123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 1000 * 60 * 60 
  }
});
app.use(sessionConfig);


connectDB();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', userController);
app.use('/dashboard', dashboardController);


app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});


app.use((req, res, next) => {
  res.status(404).render('template/bootstrap', { content: 'Sayfa bulunamadı', title: '404' });
});


app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Hata:', err);
  if (res.headersSent) return;
  res.status(err.status || 500).json({ error: 'İç sunucu hatası' });
});


app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});

export default app;

