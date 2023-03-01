const { Pool } = require('pg');
const csv = require('csv-parser');
const fs = require('fs');

const getClient = dbCreated => {
    const poolInfo = {
        user: 'postgres', // your user
        host: 'localhost', // your host
        database: 'umarket', // db name
        password: 'postgres', // your password
        port: 5432, // postgres port
    }
    const {database, ...lessInfo} = poolInfo;

    return new Pool(dbCreated ? poolInfo : lessInfo);
}

const pool = getClient();

const createDb = dbName => {
    const sql = `
        CREATE DATABASE ${dbName}
    `;
    return pool.query(
        sql
    );
}

const insertion = (row, tableName, client) => {
    const insertQuery = {
        text: `INSERT INTO ${tableName} (${Object.keys(row).join(', ')}) VALUES (${Object.keys(row).map((_, i) => `$${i + 1}`).join(', ')})`,
        values: Object.values(row),
    };

    client.query(
        insertQuery
    ).then((res) => {
        client.query(
            `SELECT setval(pg_get_serial_sequence('${tableName}', 'id'), MAX(id)) FROM ${tableName}`
        )
        console.log('Row inserted:', row);
    }).catch((err) => {
        console.error('Error inserting row:', err);
    });
}

const parseCSV = (tableName, dbName, filePath) => {
    const client = getClient(true);

    fs.createReadStream(
        filePath
    ).pipe(
        csv({ delimiter: ',', relax_column_count: true })
    ).on('headers', (headers) => {    
        console.log(headers);
    }).on('data', (row) => {
        insertion(row, tableName, client);
    }).on('end', () => {
        console.log('CSV file successfully processed');
    });
}

const createTable = (tableName, dbName, filePath) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            ID SERIAL PRIMARY KEY,
            long INT NOT NULL,
            lat INT NOT NULL,
            setcens CHAR(15) NOT NULL,
            areap CHAR(13) NOT NULL,
            coddist INT NOT NULL,
            distrito VARCHAR(150) NOT NULL,
            codsubpref INT NOT NULL,
            subprefe VARCHAR(150) NOT NULL,
            regiao5 VARCHAR(150) NOT NULL,
            regiao8 VARCHAR(150) NOT NULL,
            nome_feira VARCHAR(150) NOT NULL,
            registro CHAR(6) NOT NULL UNIQUE,
            logradouro VARCHAR(150) NOT NULL,
            numero VARCHAR(150),
            bairro VARCHAR(150) NOT NULL,
            referencia VARCHAR(150)
        )
    `;

    const client = getClient(true);

    client.query(
        sql
    ).then((res) => {
        console.log('Table created:', res);
        parseCSV(tableName, dbName, filePath);
        client.end();
    }).catch((err) => {
        console.error('Error creating table:', err);
        client.end();
    });
}

const buildDatabase = (filePath='./feiras_livres_2014.csv' , dbName='umarket', tableName='market') => {
    createDb(
        dbName
    ).then(() => {
        console.log(`Database ${dbName} created`);
        createTable(tableName, dbName, filePath)
    }).catch((err) => {
        console.log(err.message.indexOf('already exists'))
        if (err && err.message.indexOf('already exists')) {
            createTable(tableName, dbName, filePath);
        } else {
            console.error('Error creating new database:', err);
        }
    });
}

buildDatabase();
