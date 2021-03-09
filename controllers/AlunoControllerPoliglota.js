const boom = require ('@hapi/boom')

function obterConfig(req) {
  
    return req.headers['x-persistence'] === 'rest'
        ? 'http://localhost:8080'
        : req.server.plugins['hapi-mongodb'].db;
}

exports.listarAlunos = async (req, h) => {
  /**
   * @example
   * exemplo localhost:3000/alunos
   */
    const persistencia = req.headers['x-persistence'];
    const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
    const repositorio = new AlunosRepository(obterConfig(req));
    return repositorio.list();
}

exports.buscarAluno = async (req, h) => {
  /**
   * @example
   * exemplo localhost:3000/alunos/{id}
   */
    const persistencia = req.headers['x-persistence'];
    const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
    const repositorio = new AlunosRepository(obterConfig(req));
    const aluno = await repositorio.getById(req.params.id);
    return aluno;
    
    
}

exports.inserirAluno = async (req, h) => {
  
    const persistencia = req.headers['x-persistence'];
    const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
    const repositorio = new AlunosRepository(obterConfig(req));
    return repositorio.insert(req.payload);
}

exports.atualizarAluno = async (req, h) => {
    const persistencia = req.headers['x-persistence'];
    const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
    const repositorio = new AlunosRepository(obterConfig(req));
    return repositorio.update(req.params.id, req.payload);
}

exports.apagarAluno = async (req, h) => {
    const persistencia = req.headers['x-persistence'];
    const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
    const repositorio = new AlunosRepository(obterConfig(req));
    return repositorio.delete(req.params.id);
}

exports.calcularMedia = async (req, h) => {
  /**
   * @example
   * exemplo localhost:3000/alunos/{id}/media
   */
    const persistencia = req.headers['x-persistence'];
    const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
    const repoAlunos = new AlunosRepository(obterConfig(req));
    const aluno = req.payload;
  
    let conceito = "Não Definido"
    let status = "Não Definido"
  
    const p1 = 3;
    const p2 = 3;
    const p3 = 1.5;
    const p4 = 2.5;
    
    media = ((req.payload.prova1 * p1) + (req.payload.prova2 * p2) + (req.payload.trabalho * p3) + (req.payload.apresentacao * p4)) / (p1 + p2 + p3 + p4)

    if (media >= 6 && media <= 10) 
    {
      status = 'aprovado'
      if (media >= 9 && media <= 10) {
        conceito = 'A'
      } else if (media >= 7 && media < 9) {
        conceito = 'B'
      } else conceito = 'C'
  
    } else if (media >= 0 && media < 6) 
    {
      status = 'reprovado'
      if (media < 3) {
        conceito = 'E'
      }
      else conceito = 'D'
    }
   
    if(media >= 0 && media <= 10)
    {
        req.payload.media = parseFloat(media.toFixed(1))
        req.payload.conceito= conceito
        req.payload.status = status
    } else {
        req.payload.media = "A media ainda não pode ser calculada"
    }
    
    repoAlunos.update(req.params.id, aluno);
    return req.payload;
  }

