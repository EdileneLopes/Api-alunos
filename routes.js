const AlunoController = require('./controllers/AlunoControllerPoliglota.js');
const AdministradorController = require('./controllers/AdministradorController.js');

module.exports = [
  {
    method: 'GET',
    path: '/alunos',
    options: {
      tags: ['api', 'alunos']
    },
    handler: AlunoController.listarAlunos
  },
  {
    method: 'GET',
    path: '/alunos/{id}',
    options: {
      tags: ['api', 'alunos'],
      auth: false
    },
    handler: AlunoController.buscarAluno
  },
  {
    method: 'POST',
    path: '/alunos',
    options: {
      tags: ['api', 'alunos']
    },
    handler: AlunoController.inserirAluno
  },
  {
    method: 'DELETE',
    path: '/alunos/{id}',
    options: {
      tags: ['api', 'alunos']
    },
    handler: AlunoController.apagarAluno
  },
  {
    method: 'PUT',
    path: '/alunos/{id}',
    options: {
      tags: ['api', 'alunos']
    },
    handler: AlunoController.atualizarAluno
  },
  {
    method: 'PUT',
    path: '/alunos/{id}/media',
    options: {
      tags: ['api', 'alunos']
    },
    handler: AlunoController.calcularMedia
  },
  {
    method: 'POST',
    path: '/token',
    options: {
      tags: ['api', 'administrador']
    },
    handler: AdministradorController.token
  },
]