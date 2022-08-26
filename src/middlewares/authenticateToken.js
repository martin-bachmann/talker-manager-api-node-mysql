const readFile = require('../services/readFile');

const TOKENS_PATH = '../tokens.json';

const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  const tokens = await readFile(TOKENS_PATH);
  if (!tokens.some((token) => token === authorization)) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = authenticateToken;
