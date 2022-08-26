const fs = require('fs').promises;
const { join } = require('path');

const writeFile = async (path, content) => {
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(content));
  } catch (error) {
    console.log('Erro na escrita do arquivo');
  }
};

module.exports = writeFile;
