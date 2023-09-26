module.exports = {
  JWT_ALGORITHM: process.env.JWT_ALGORITHM ?? 'HS256',
  JWT_TTL: process.env.JWT_TTL ?? '1440',
  JWT_SECRET: process.env.JWT_SECRET
};
