const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom')

const connectionString = 'mongodb://localhost:27017/aluno';

exports.token = async (req, h) => {
  const response = h.response();

  const { authorization } = req.headers;
  if (!authorization) {
    return Boom.unauthorized('Authorization não foi enviado!');
  }

  const [scheme, valor] = authorization.split(' ');

  if (scheme !== 'Basic') {
    return Boom.unauthorized('Scheme inválido');
  }

  const credenciais = Buffer.from(valor, 'base64').toString();
  const [email, senha] = credenciais.split(':');
  if (!email || !senha) {
    return Boom.unauthorized('Não existe usuário ou senha');
  }

  const client = await MongoClient.connect(connectionString);
  const db = client.db('aluno');

  const usuario = await db.collection('usuarios').find({ email, senha });
  if (!usuario) {

    return Boom.unauthorized('Usuário ou senha inválidos');
  }

  const token = jwt.sign({ sub: usuario.email }, 'chavesecreta');

  return {
    access_token: token,
  };
}