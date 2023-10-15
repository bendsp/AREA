import { Logger } from '@nestjs/common';
import { db } from './db.setup';
import { TableNames } from './db.interface';
import { SelectTimeData } from 'src/time/time.interface';
import { SelectEmailData } from 'src/mailing/mailing.interface';
import { SelectAreaData } from 'src/client/client.interface';
import { User } from './db.interface';

async function selectData(tableName: TableNames, user_id: number = 0,  columnName:string = '*'): Promise<(SelectEmailData | User | SelectTimeData | SelectAreaData)[] | string | number> {
    try {
        if (user_id === 0) {
            let query = `SELECT ${columnName} FROM "${tableName}";`;
            const result = await db.result<SelectEmailData | SelectTimeData | SelectAreaData | User>(query);
            Logger.log(result.rows)
            if (columnName === '*')
                return result.rows;
            else
                return result.rows[0][columnName];
        }
        let query = `SELECT ${columnName} FROM "${tableName}" WHERE user_id = ${user_id};`;
        const result = await db.result<SelectEmailData | SelectTimeData | SelectAreaData | User>(query);
        Logger.log(result.rows)
        if (columnName === '*')
            return result.rows;
        else
            return result.rows[0][columnName];
    } catch (error) {
        console.error('Error selecting value:', error);
    }
}

export {selectData}