const convict = require('convict');
require('dotenv').config();
const path = require('path');

const config = convict({
  env: {
    doc: 'Application Enviroment',
    env: 'NODE_ENV',
    format: ['production', 'staging', 'development'],
    default: 'development',
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    db: process.env.REDIS_DB,
  },
});

if (process.env.NODE_ENV != null) {
  const env = config.get('env');
  config.loadFile(path.resolve(`backend/config/${env.trim()}.json`));
} else {
  config.loadFile(path.resolve('backend/config/development.json'));
}

module.exports = config;
