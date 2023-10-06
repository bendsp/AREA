import { IDatabase } from 'pg-promise';

const pgp = require('pg-promise')();

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'root',
    password: 'toor',
};

const db: IDatabase<any> = pgp(dbConfig);

export { db };