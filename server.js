const Hapi = require('@hapi/hapi');
const rotas = require('./routes.js');
const MongoDbMiddleware = require('./middlewares/MongoDbMiddleware.js');

(async function() {

  const server = Hapi.server({ 
    port: 3000,
    host: 'localhost'
  });

  
  await MongoDbMiddleware(server);

  rotas.forEach(rota => server.route(rota));

  await server.start();
  console.log('Nosso servidor de alunos está rodando em !', server.info.uri);

})()

