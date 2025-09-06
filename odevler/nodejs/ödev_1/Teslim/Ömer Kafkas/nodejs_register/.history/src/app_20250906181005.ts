// app.ts dosyasının diğer kodları...
// Örneğin:
import express from 'express';

const app = express();
const PORT = 3000;

// Sadece bir örnek rota
app.get('/', (req, res) => {
  res.send('Sunucu çalışıyordfgd');
});

// Sunucuyu başlat ve belirtilen portu dinle
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});