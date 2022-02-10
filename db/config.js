const { config } = require('../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  develoment: {
    url:URI,
    dialect:'postgres',
  },
  production: {
    url:URI,
    dialect:'postgres',
  }
}
