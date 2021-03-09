const { ObjectId } = require('mongodb');

class MongoDbRepository {
/**
 * Inicia uma nova chamada da classe alunosRepository.
 * @param {*} db Instância de banco de dados MongoDb
 * @param {*} collection Coleção de dados no banco de dados
 */
  constructor(db, collection) {
    this.db = db;
    this.collection = db.collection(collection);
  }


  /**
   * Fam um getAll na coleção de alunos no banco de dados.
   * @param {*} query consulta
   * @returns uma lista com todos os alunos cadastrados
   */
  async list(query = {}) {
    return this.collection.find(query).toArray();
  }


  /**
   * Faz uma busca de aluno por id.
   * @param {*} id é o parãmetro passado no cabeçalho da requisição
   * @returns retorna um único aluno referente ao id buscado
   */
  async getById(id) {
    const _id = ObjectId.createFromHexString(id);
    return this.collection.findOne({ _id })
    
  } 


  /**
   * Cria (cadastra) um novo aluno.
   * @param {*} doc É tudo o que foi passado no body da requisição
   * @returns O aluno cadastrado na collection
   */
  async insert(doc) {
    const { ops } = await this.collection.insertOne(doc);
    return ops[0];
  }

  

/**
 * Apaga um aluno a partir do id. 
 * @param {*} id o parâmetro para trazer um único aluno 
 * @returns mensagem se foi deletado
 */
  async delete(id) {
    const _id = ObjectId.createFromHexString(id);
    const resultado = await this.collection.deleteOne({ _id });
    return 'Aluno apagado com sucesso'
  }
  

  /**
   * Faz alterações no cadastro do aluno a partir do id.
   * @param {*} id parâmetro para encontrar um único aluno
   * @param {*} obj documento aluno
   * @returns O aluno com suas alterções
   */
  async update(id, obj) {
    const _id = ObjectId.createFromHexString(id);
    const { modifiedAluno } = await this.collection.updateOne({ _id }, {
      $set: obj
    });
    return modifiedAluno;
  }

  async calcularMedia() {
    const p1 = 30;
		const p2 = 30;
		const p3 = 15;
		const p4 = 25;
		
		media = ((prova1 * p1) + (prova2 * p2) + (trabalho * p3) + (apresentacao * p4)) / (p1 + p2 + p3 + p4); 

		return `Sua media ponderada é: ${media}`;
  
  }
}





 
module.exports = MongoDbRepository