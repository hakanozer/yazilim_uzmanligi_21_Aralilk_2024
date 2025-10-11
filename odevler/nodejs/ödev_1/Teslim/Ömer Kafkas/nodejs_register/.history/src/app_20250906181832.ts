// app.ts dosyasının diğer kodları...
// Örneğin:
import express from 'express';

const app = express();
const PORT = 3000;

// Sadece bir örnek rota



app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});