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
  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerFile();
  const talker = talkers.find((element) => element.id === Number(id));
  if (talker) return res.status(200).json(talker);
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

module.exports = router;