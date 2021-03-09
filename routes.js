const AlunoController = require('./controllers/AlunoControllerPoliglota.js');

module.exports = [
    {
      method: 'GET',
      path: '/alunos',
      handler: AlunoController.listarAlunos
    },
    {
      method: 'GET',
      path: '/alunos/{id}',
      handler: AlunoController.buscarAluno
    },
    {
      method: 'POST',
      path: '/alunos',
      handler: AlunoController.inserirAluno
    },
    {
      method: 'DELETE',
      path: '/alunos/{id}',
      handler: AlunoController.apagarAluno
    },
    {
      method: 'PUT',
      path: '/alunos/{id}',
      handler: AlunoController.atualizarAluno
    },
    {
      method: 'PUT',
      path: '/alunos/{id}/media',
      handler: AlunoController.calcularMedia
    },
]