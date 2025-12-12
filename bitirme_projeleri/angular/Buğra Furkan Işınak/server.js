const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

// middleware
server.use(middlewares);
server.use( auth);
server.use(router);

// port 3000’de başlat
server.listen(3000, () => {
  console.log('JSON Server Auth running on port 3000');
});