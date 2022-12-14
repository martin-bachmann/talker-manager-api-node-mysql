const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const readFile = require('../services/readFile');
const writeFile = require('../services/writeFile');

const router = express.Router();

const TALKER_PATH = '../talker.json';

router.get('/search',
  authenticateToken,
  async (req, res) => {
    const { q } = req.query;
    const talkers = await readFile(TALKER_PATH);
    if (q) {
      const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
      return res.status(200).json(filteredTalkers);
    }
    return res.status(200).json(talkers);
  });

router.get('/', async (req, res) => {
  const talkers = await readFile(TALKER_PATH);
  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile(TALKER_PATH);
  const talker = talkers.find((element) => element.id === Number(id));
  if (talker) return res.status(200).json(talker);
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

router.post('/',
  authenticateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { body } = req;
    const talkers = await readFile(TALKER_PATH);
    const nextId = talkers.reduce((acc, talker) => (acc > talker.id ? acc : talker.id + 1));
    const newTalker = {
      ...body,
      id: nextId,
    };
    talkers.push(newTalker);
    await writeFile(TALKER_PATH, talkers);
    res.status(201).json(newTalker);
});

router.put('/:id', 
  authenticateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const talkers = await readFile(TALKER_PATH);
    const selectedTalker = talkers.find((talker) => talker.id === Number(id));
    if (selectedTalker) {
      const index = talkers.indexOf(selectedTalker);
      const updatedTalker = {
        id: Number(id),
        ...body,
      };
      talkers.splice(index, 1, updatedTalker);
      await writeFile(TALKER_PATH, talkers);
      return res.status(200).json(updatedTalker);
    }
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

router.delete('/:id',
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile(TALKER_PATH);
    const selectedTalker = talkers.find((talker) => talker.id === Number(id));
    if (selectedTalker) {
      const index = talkers.indexOf(selectedTalker);
      talkers.splice(index, 1);
      await writeFile(TALKER_PATH, talkers);
      return res.status(204).end();
    }
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

module.exports = router;