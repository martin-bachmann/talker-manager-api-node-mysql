// função fornecida pela trybe nos exercícios do dia 22.4
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;