const { Pool } = require('pg');

const connection = new Pool({
    user: 'postgres', // your user
    host: 'localhost', // your host
    database: 'umarket', // db name
    password: 'postgres', // your password
    port: 5432, // postgres port
});

module.exports = connection;
