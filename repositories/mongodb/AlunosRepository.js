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
/* 
const resultado = agrupamentos.reduce((acumulador, { total, categoria }) => {
  acumulador[categoria] = total;
  return acumulador;
}, {});

return resultado;
}
} */
