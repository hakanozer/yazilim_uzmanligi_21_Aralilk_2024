import express from 'express';
import path from 'path';
// ...existing code...

const app = express();
const PORT = 3000;

//EJS Configuration
// Use project root aware views path so both `ts-node` (src) and built `dist` work
const viewsPath = path.join(process.cwd(), 'src', 'views');
app.set("views", viewsPath);
app.set("view engine", "ejs")

// Body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//İmport controllers
import { userController } from './controllers/userController';

//user controller

app.use("/", userController);


app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});