const { Pool } = require('pg');


  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'MATIUSROCK',
    password: '1054561667QAZXSW',
    database: 'my_store'
  });

module.exports = pool;
