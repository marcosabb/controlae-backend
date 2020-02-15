const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.use(jsonServer.rewriter({
  '/devices': '/devices',
  '/brands/:id': '/devices/:id/brands',
  '/controls/:id': '/devices/:id/controls'
}))

server.listen(port);