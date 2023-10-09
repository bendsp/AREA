import { Status } from 'src/main';
import { db } from './db.setup';

async function UpdateData(user_id: number, newValue:any, tableName:string, columnName:string): Promise<boolean> {
    try {
        let query = `UPDATE "${tableName}" SET "${columnName}" = ${newValue} WHERE user_id = ${user_id};`;
        const result = await db.result(query);

        if (result.rowCount === 1) {
            console.log(`Value updated successfully for ID ${user_id}`);
            return true
        } else {
            console.log(`No rows were updated for ID ${user_id}`);
            return false
        }
    } catch(error)  {
        console.error('Error updating value:', error);
        return false
    }

}

export {UpdateData}