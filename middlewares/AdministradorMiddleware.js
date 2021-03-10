const JwtPlugin = require('@hapi/jwt');

module.exports = async (server) => {
  await server.register(JwtPlugin);

  server.auth.strategy('autorizacao_jwt', 'jwt', {
    keys: 'chavesecreta',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: false,
      exp: false,
      maxAgeSec: 84600, // 24 hours
      timeSkewSec: 15
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
      };
    }
  });

  server.auth.default('autorizacao_jwt');
};