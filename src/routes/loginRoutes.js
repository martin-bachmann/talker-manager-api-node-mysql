const express = require('express');
const generateToken = require('../services/generateToken');

const router = express.Router();

router.post('/', async (req, res) => {
  const token = generateToken();
  return res.status(200).json({
    token,
  });
});

module.exports = router;