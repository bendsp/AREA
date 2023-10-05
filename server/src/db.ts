import { IMain, IDatabase } from 'pg-promise';
import pgPromise from 'pg-promise';

const pgp: IMain = pgPromise();

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'Area',
  user: 'root',
  password: 'toor',
};

async function insertData(data: any) {
    try {
      const query = 'INSERT INTO User (email, name) VALUES ($1, $2)';
      await db.none(query, [data.colonne1, data.colonne2]);
      console.log('Données insérées avec succès.');
    } catch (error) {
      throw error;
    }
  }
  

const db: IDatabase<any> = pgp(dbConfig);

export { db, insertData };