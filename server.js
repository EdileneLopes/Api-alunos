const Hapi = require('@hapi/hapi');
const swaggered = require('hapi-swaggered');
const swaggeredUI = require('hapi-swaggered-ui');
const vision = require('vision');
const inert = require('inert');
const rotas = require('./routes.js');
const MongoDbMiddleware = require('./middlewares/MongoDbMiddleware.js');

(async function () {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register([
    inert,
    vision,
    {
      plugin: swaggered,
      options: {
        info: {
          title: 'Persistência Poliglota',
          description: 'API - Sistema de Gerenciamento de Alunos - Que permite o Cadastro, Inclusão, Consulta e Exclusão de Alunos com Autenticação JSON Web Token - Persistência Poliglota',
          version: '1.0.0',
          termsOfService: "https://swagger.io/terms/",
          contact: {
            name: "Gamados por Java",
            url: "https://github.com/EdileneLopes/Api-alunos",
            email: "lopes_edi@yahoo.com.br"
          },
          license: {
            name: "MIT - LICENSE",
            url: "https://github.com/EdileneLopes/Api-alunos/blob/master/LICENSE"
          }
        }
      }
    },
    {
      plugin: swaggeredUI,
      options: {
        title: 'Example API',
        path: '/docs',
        authorization: {
          field: 'apiKey',
          scope: 'query', // header works as well
          // valuePrefix: 'bearer '// prefix incase
          defaultValue: 'demoKey',
          placeholder: 'Enter your apiKey here'
        },
        swaggerOptions: {
          validatorUrl: null
        }
      }
    }
  ])

  await MongoDbMiddleware(server);

  rotas.forEach(rota => server.route(rota));

  await server.start();
  console.log('Nosso servidor de alunos está rodando em ...', server.info.uri);

})()


