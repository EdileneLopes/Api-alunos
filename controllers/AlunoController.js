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

  /************************************** /
   *  apresentacao comentando pois      *
   * nao vem no payload do req          * 
   * ********************************** */
  
  const db = req.server.plugins['hapi-mongodb'].db;
  const repoAlunos = new AlunosRepository(db);
    
    //media
    console.log('req:',req)

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

      
   if(media>5)
   {status='aprovado'
      if (media>9){
        conceito='A'
      }
      if (media>7){
        conceito='B'
      }else conceito='C'
    
   }
   if(media<5)
   {
    status='reprovado'
     if (media<3){
      conceito='E'    }
    else conceito='F'
  }
  

    
    var myquery = { status: "Valley 345" };
    var newvalues = { $set: {media : "Mickey", conceito: "Canyon 123",  } };
    db.aluno("alunos").updateOne(myquery, newvalues)
    
    return media.toFixed(2)

}
