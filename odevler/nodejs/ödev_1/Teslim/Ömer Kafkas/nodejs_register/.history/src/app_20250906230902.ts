import express from 'express';
import path from 'path';
// ...existing code...

const app = express();
const PORT = 3000;

//EJS Configuration
app.set("views", path.join(__dirname, "views"))
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