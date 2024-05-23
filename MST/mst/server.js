import jsonServer from 'json-server';
import bodyParser from 'body-parser';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3000;

server.use(middlewares);
server.use(bodyParser.json());

server.get('/random-number', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100);
  res.json({ randomNumber });
});

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
