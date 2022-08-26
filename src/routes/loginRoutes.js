const express = require('express');
const generateToken = require('../services/generateToken');
const readFile = require('../services/readFile');
const writeFile = require('../services/writeFile');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

const TOKENS_PATH = '../tokens.json';

router.post('/', validateEmail, validatePassword, async (req, res) => {
  const token = generateToken();
  const tokens = await readFile(TOKENS_PATH);
  tokens.push(token);
  await writeFile(TOKENS_PATH, tokens);
  return res.status(200).json({
    token,
  });
});

module.exports = router;