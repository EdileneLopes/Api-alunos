const MongoDbRepository = require('./MongoDbRepository.js');


class AlunosRepository extends MongoDbRepository {
  constructor(db) {
    super(db, 'alunos');
  }

}
  
module.exports = AlunosRepository;