import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

//EJS Configuration
app.set("views", path.join(__dirname, "views"))
app.set()


app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});