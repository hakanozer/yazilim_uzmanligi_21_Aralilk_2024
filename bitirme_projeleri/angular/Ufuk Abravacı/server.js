const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Varsayılan middleware'ler (logger, cors, dll.)
server.use(middlewares);

// JSON Server Auth için veritabanı
server.db = router.db;

// Auth middleware'i (register, login)
server.use(auth);

// CRUD API'ler
server.use(router);

// Sunucu başlat
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server with Auth is running on http://localhost:${PORT}`);
  console.log(`🔑 Register: POST http://localhost:${PORT}/register`);
  console.log(`🔑 Login:    POST http://localhost:${PORT}/login`);
});