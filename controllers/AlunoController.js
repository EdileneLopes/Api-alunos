const { MongoClient, ObjectId } = require('mongodb');
const MongoDbRepository = require('../repositories/mongodb/MongoDbRepository.js');
const AlunosRepository = require('../repositories/mongodb/AlunosRepository.js');
const jwt = require('jsonwebtoken');

const connectionString = 'mongodb://localhost:27017/aluno';

function validarJwt(token) {
  let valido = false;
  try {
    const payload = jwt.verify(token, 'chavesecreta');
    valido = !!payload;
  } catch {
  }
  return valido;
}

exports.listarAlunos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new AlunosRepository(db);
  return repositorio.list();
}


exports.inserirAluno = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoAlunos = new AlunosRepository(db);

  return repoAlunos.insert(req.payload);
}

exports.buscarAluno = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new AlunosRepository(db);
  const aluno = await repositorio.getById(req.params.id);

  return aluno;
}


exports.apagarAluno = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoAlunos = new AlunosRepository(db);
  return repoAlunos.delete(req.params.id);
}

exports.atualizarAluno = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoAlunos = new AlunosRepository(db);
  const aluno = req.payload;

  return repoAlunos.update(req.params.id, aluno);

}

exports.calcularMedia = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoAlunos = new AlunosRepository(db);
  const aluno = req.payload;

  let conceito = "Não Definido"
  let status = "Não Definido"

  const p1 = 3;
  const p2 = 3;
  const p3 = 1.5;
  const p4 = 2.5;

  let media = ((req.payload.prova1 * p1) + (req.payload.prova2 * p2) + (req.payload.trabalho * p3) + (req.payload.apresentacao * p4)) / (p1 + p2 + p3 + p4)

  req.payload.media = parseFloat(media.toFixed(1))
  repoAlunos.update(req.params.id, aluno);

  if (media >= 6 && media <= 10) {
    status = 'aprovado'
    if (media > 9) {
      conceito = 'A'
    }
    if (media > 7) {
      conceito = 'B'
    } else conceito = 'C'

  } else if (media >= 0 && media < 6) {
    status = 'reprovado'
    if (media < 3) {
      conceito = 'E'
    }
    else conceito = 'D'
  }
 
  req.payload.status = status
  req.payload.conceito= conceito

  repoAlunos.update(req.params.id, aluno);
  return req.payload;
}