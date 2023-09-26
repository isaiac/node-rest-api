const cors = require('cors');

const corsConfig = require('../../config/cors');

module.exports = (req, res, next) => {
  cors(corsConfig)(req, res, next);
};
