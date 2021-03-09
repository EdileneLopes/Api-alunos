const RestRepository = require('./RestRepository.js');

class AlunosRepository extends RestRepository {
  constructor(apiUrl) {
    super(apiUrl, '/alunos');
  }

}
  
module.exports = AlunosRepository;