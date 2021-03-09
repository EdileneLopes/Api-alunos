const AlunoController = require('./controllers/AlunoControllerPoliglota.js');

module.exports = [
    {
      method: 'GET',
      path: '/alunos',
      options: {
        tags: ['api']
      },
      handler: AlunoController.listarAlunos
    },
    {
      method: 'GET',
      path: '/alunos/{id}',
      options: {
        tags: ['api']
      },
      handler: AlunoController.buscarAluno
    },
    {
      method: 'POST',
      path: '/alunos',
      options: {
        tags: ['api']
      },
      handler: AlunoController.inserirAluno
    },
    {
      method: 'DELETE',
      path: '/alunos/{id}',
      options: {
        tags: ['api']
      },
      handler: AlunoController.apagarAluno
    },
    {
      method: 'PUT',
      path: '/alunos/{id}',
      options: {
        tags: ['api']
      },
      handler: AlunoController.atualizarAluno
    },
    {
      method: 'PUT',
      path: '/alunos/{id}/media',
      options: {
        tags: ['api']
      },
      handler: AlunoController.calcularMedia
    }
]