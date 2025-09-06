import express from 'express';

const app = express();
const PORT = 3000;

//E


app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});