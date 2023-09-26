const { dirname } = require('path');

module.exports = {
  dirPath: __dirname,
  rootPath: dirname(require.main.filename)
};
