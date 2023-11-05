import { Logger } from '@nestjs/common';
import { db } from './db.setup';
import { TableNames, Tables } from './db.interface';
import { SelectTimeData } from 'src/time/time.interface';
import { SelectEmailData } from 'src/mailing/mailing.interface';
import { SelectAreaData } from 'src/db/db.interface';
import { User } from './db.interface';

type SelectDbQuery = SelectEmailData | User | SelectTimeData | SelectAreaData;
/** @deprecated use selectRows or selectRow instead */
export async function selectData<T extends SelectDbQuery>(
  tableName: TableNames,
  user_id: string = '0',
  columnName: string = '*',
): Promise<T[] | string | number> {
  try {
    if (user_id === '0') {
      const query = `SELECT ${columnName} FROM "${tableName}";`;
      const result = await db.result<T>(query);
      Logger.log(result.rows);
      if (columnName === '*') return result.rows;
      else return result.rows[0][columnName];
    }
    const query = `SELECT ${columnName} FROM "${tableName}" WHERE user_id = '${user_id}';`;
    const result = await db.result<T>(query);
    Logger.log(result.rows);
    if (columnName === '*') return result.rows;
    else {
      Logger.log(' test : ' + result.rows[0]);
      return result.rows[0][columnName];
    }
  } catch (error) {
    console.error('Error selecting value:', error);
  }
}

type ExtractTable<T extends TableNames, U extends Tables = Tables> = U extends {
  TablesName: T;
}
  ? U['value']
  : never;

export async function selectRows<
  T extends TableNames,
  U extends ExtractTable<T> = ExtractTable<T>,
>(tableName: T, user_id?: string): Promise<U[]> {
  try {
    const query = user_id
      ? `SELECT * FROM "${tableName}" WHERE user_id = '${user_id}';`
      : `SELECT * FROM "${tableName}";`;
    const result = await db.result<U>(query);
    return result.rows;
  } catch (error) {
    console.error('Error selecting value:', error);
    return [];
  }
}

export async function selectRow<T extends string>(
  tableName: TableNames,
  columnName: string,
  user_id?: string,
): Promise<T | null> {
  try {
    const query = user_id
      ? `SELECT ${columnName} FROM "${tableName}" WHERE user_id = '${user_id}';`
      : `SELECT ${columnName} FROM "${tableName}";`;
    const result = await db.result<T>(query);
    // Logger.log(result.rows);
    return result.rows[0][columnName];
  } catch (error) {
    console.error('Error selecting value:', error);
    return null;
  }
}
