const MongoDbRepository = require('./MongoDbRepository.js');


class AlunosRepository extends MongoDbRepository {
  /**
   * 
   * @param {*} db Inicia classe filha que estende da MongodbRepository
   */
  constructor(db) {
    super(db, 'alunos');
  }

}
  
module.exports = AlunosRepository;
