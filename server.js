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


  exports.buscarAluno = async (req, h) => {
    const db = req.server.plugins['hapi-mongodb'].db;
    const repositorio = new AlunosRepository(db);
    const aluno = await repositorio.getById(req.params.id);
   console.log(aluno)
    return aluno;
  }

   
  // const media = {
  //   prova1: req.payload["prova1"],
  //   prova2: req.payload['prova2'],
  //   trabalho: req.payload['trabalho'],
  //   apresentacao: req.apresentacao['apresentacao']
  // };
  // console.log(media); 

})()

