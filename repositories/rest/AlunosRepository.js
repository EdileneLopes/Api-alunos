const RestRepository = require('./RestRepository.js');

class AlunosRepository extends RestRepository {
  /**Inicia uma classe filha que estende da restRepository
   * 
   * @param {*} apiUrl é a URL base da api em Java
   */
  constructor(apiUrl) {
    super(apiUrl, '/alunos');
  }

}
  
module.exports = AlunosRepository;