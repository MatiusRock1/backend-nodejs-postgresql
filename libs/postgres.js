const { Client } = require('pg');


async function getConnettion(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'MATIUSROCK',
    password: '1054561667QAZXSW',
    database: 'my_store'
  });

  await client.connect();
  return client;
}

module.exports = getConnettion;
