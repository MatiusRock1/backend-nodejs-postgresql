const { Pool } = require('pg');
const { config } = require('../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
let URI = '';
const options = {};

if (config.isProd){
  URI = config.dbUrl;
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized:false
  }
}
else{

  options.connectionString= config.dbUrl;
}

const pool = new Pool(options);

module.exports = pool;
