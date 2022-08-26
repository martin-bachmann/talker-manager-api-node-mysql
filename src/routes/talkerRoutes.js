const express = require('express');
const fs = require('fs').promises;
const { join } = require('path');

const router = express.Router();

const readTalkerFile = async () => {
  try {
    const path = '../talker.json';
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    console.log('Erro na leitura do arquivo');
    return null;
  }
};

router.get('/', async (req, res) => {
  const talkers = await readTalkerFile();
  res.status(200).json(talkers);
});

module.exports = router;