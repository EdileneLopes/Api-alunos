const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const Ajv = require("ajv").default;
const localize = require('ajv-i18n/localize/pt-BR');
const alunoSchema = require('../schema/Aluno.json');

const ajv = new Ajv({ allErrors: true })
const validateAluno = ajv.compile(alunoSchema)

function obterConfig(req) {

  return req.headers['x-persistence'] === 'rest'
    ? 'http://localhost:8080'
    : req.server.plugins['hapi-mongodb'].db;
}

exports.listarAlunos = async (req, h) => {
  /**
   * @example
   * exemplo localhost:3000/alunos
   */
  const persistencia = req.headers['x-persistence'];
  const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
  const repositorio = new AlunosRepository(obterConfig(req));
  return repositorio.list();
}

exports.buscarAluno = async (req, h) => {
  /**
   * @example
   * exemplo localhost:3000/alunos/{id}
   */
  const persistencia = req.headers['x-persistence'];
  const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
  const repositorio = new AlunosRepository(obterConfig(req));
  const aluno = await repositorio.getById(req.params.id);
  return aluno;


}

exports.inserirAluno = async (req, h) => {
  const valid = validateAluno(req.payload)
  if (!valid) {
   let error = Boom.badData("Não foi possível processar as instruções presentes da Entidade Aluno.");
   localize(validateAluno.errors);
   error.output.payload.Aluno = validateAluno.errors;
   return error;
  } 
  const persistencia = req.headers['x-persistence'];
  const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
  const repositorio = new AlunosRepository(obterConfig(req));
  return repositorio.insert(req.payload);
}

exports.atualizarAluno = async (req, h) => {
  const valid1 = validateAluno(req.payload);
  if (!valid1) {
   let error = Boom.badData("Não foi possível processar as instruções presentes da Entidade Aluno.");
   localize(validateAluno.errors);
   error.output.payload.Aluno = validateAluno.errors;
   return error;
  } 
  const persistencia = req.headers['x-persistence'];
  const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
  const repositorio = new AlunosRepository(obterConfig(req));
  return repositorio.update(req.params.id, req.payload);
}

exports.apagarAluno = async (req, h) => {
  const persistencia = req.headers['x-persistence'];
  const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
  const repositorio = new AlunosRepository(obterConfig(req));
  return repositorio.delete(req.params.id);
}

exports.calcularMedia = async (req, h) => {
  let prova1 = req.payload.prova1
  let prova2 = req.payload.prova2
  let trabalho = req.payload.trabalho
  let apresentacao = req.payload.apresentacao
  const valid = validateAluno(req.payload);
  if (!valid) {
   let error = Boom.badData("Não foi possível processar as instruções presentes da Entidade Aluno.");
   localize(validateAluno.errors);
   error.output.payload.media = validateAluno.errors;
   return error;
  }
  /**
   * @example
   * exemplo localhost:3000/alunos/{id}/media
   */
  const persistencia = req.headers['x-persistence'];
  const AlunosRepository = require(`../repositories/${persistencia}/AlunosRepository.js`);
  const repoAlunos = new AlunosRepository(obterConfig(req));
  const aluno = req.payload;

  const p1 = 3;
  const p2 = 3;
  const p3 = 1.5;
  const p4 = 2.5;

  media = ((prova1 * p1) + (prova2 * p2) + (trabalho * p3) + (apresentacao * p4)) / (p1 + p2 + p3 + p4)

  if (media >= 6 && media <= 10) {
    status = 'aprovado'
    if (media >= 9 && media <= 10) {
      conceito = 'A'
    } else if (media >= 7 && media < 9) {
      conceito = 'B'
    } else conceito = 'C'
  } else if (media >= 0 && media < 6) {
    status = 'reprovado'
    if (media < 3) {
      conceito = 'E'
    }
    else conceito = 'D'
  }

  if (media >= 0 && media <= 10) {
    req.payload.media = parseFloat(media.toFixed(1))
    req.payload.conceito = conceito
    req.payload.status = status
  } else {
    let error = Boom.unauthorized("Preencha todas as notas antes de calcular a media");
    error.output.payload.message1 = 'Cada nota não pode ser menor que 0 e maior que 10';
    error.output.payload.message2 = 'Digite apenas numeros';
    return error;
  }

  repoAlunos.update(req.params.id, aluno);
  return req.payload;
}