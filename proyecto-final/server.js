const jsonServer = require('C:\\Users\\user\\Documents\\GitHub\\proyecto_final\\proyecto-final\\node_modules\\json-server');
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();
/* const fs = require('fs');
const path = require('path'); 

const dataFilePath = path.join(__dirname, 'data.json'); */

server.use(middlewares);
server.use(router);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
 