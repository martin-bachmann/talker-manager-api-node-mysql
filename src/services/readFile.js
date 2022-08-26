const fs = require('fs').promises;
const { join } = require('path');

const readFile = async (path) => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    console.log('Erro na leitura do arquivo');
    return null;
  }
};

module.exports = readFile;
