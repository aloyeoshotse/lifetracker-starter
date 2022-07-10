// import { Client } from 'pg';
import pkg from 'pg';
import { getDatabaseURI } from './config.js';
import colors from 'colors';

const { Client } = pkg;

const db = new Client({ connectionString:getDatabaseURI() });

db.connect((err) => {
    if (err) {
        console.error('connection error'.red, err.stack);
    }
    else {
        console.log('Successfully connected to postgres db!'.blue);
    }
});

export default db;