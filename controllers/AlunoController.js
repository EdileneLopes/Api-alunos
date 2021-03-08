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

exports.calcularMedia = (req, h)  => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoAlunos = new AlunosRepository(db);
  
    const p1 = 30;
		const p2 = 30;
		const p3 = 15;
		const p4 = 25;  

   let prova1=req.payload["prova1"]
   let prova2=req.payload['prova2']
   let trabalho=req.payload['trabalho']
   let apresentacao=req.payload['apresentacao']
   let media = ((prova1 * p1) + (prova2 * p2) + (trabalho * p3) + (apresentacao * p4)) / (p1 + p2 + p3 + p4)

   console.log(req.payload);
   console.log('Sua média ponderada é: ' + media); 
  
    return media
}
