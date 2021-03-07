const { MongoClient, ObjectId } = require('mongodb');
const MongoDbRepository = require('../repositories/mongodb/MongoDbRepository.js');
const AlunosRepository = require('../repositories/mongodb/AlunosRepository.js');

const connectionString = 'mongodb://localhost:27017/aluno';

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
  const aluno =  req.payload;
  
  return repoAlunos.update(req.params.id, aluno);
  
}

exports.calcularMedia = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const  disciplinas = new AlunosRepository(db);
  

 
  const media = {
    prova1: req.payload["prova1"],
    prova2: req.payload['prova2'],
    trabalho: req.payload['trabalho'],
    apresentacao: req.apresentacao['apresentacao']
  };

}
