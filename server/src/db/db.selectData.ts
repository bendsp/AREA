import { Logger } from '@nestjs/common';
import { db } from './db.setup';

async function selectData(user_id: number, tableName:string, columnName:string = '*'){
    try {
        let query = `SELECT ${columnName} FROM "${tableName}" WHERE user_id = ${user_id};`;
        const result = await db.result(query);
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