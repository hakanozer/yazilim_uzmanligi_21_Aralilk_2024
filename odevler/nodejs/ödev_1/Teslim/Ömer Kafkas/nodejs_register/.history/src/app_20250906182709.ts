import express from 'express';

const app = express();
const PORT = 3000;

//EJS Configuration
app.set("views", path.join(__dirname),)


app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});