import {db} from './db.setup';

export async function deleteData(data: any): Promise<boolean> {
    try {
        await db.none(`DELETE FROM "${data.TablesName}" WHERE user_id = '$1' AND area_id = $2;`, [data.user_id, data.area_id]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}