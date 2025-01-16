const jsonServer = require('C:\\Users\\oihan\\OneDrive\\Documentos\\GitHub\\proyecto_final\\proyecto-final\\node_modules');
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
 