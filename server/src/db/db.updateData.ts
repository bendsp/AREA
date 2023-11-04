import { db } from './db.setup';

async function UpdateData(
  user_id: string,
  newValue: any,
  tableName: string,
  columnName: string,
  area_id?: number,
): Promise<boolean> {
  try {
    let query: string;
    if (columnName === 'github_token' && area_id === undefined) {
      query = `UPDATE "${tableName}" SET "${columnName}" = '${newValue}' WHERE user_id = '${user_id}';`;
    } else {
      query =
        area_id === undefined
          ? `UPDATE "${tableName}" SET "${columnName}" = ${newValue} WHERE user_id = '${user_id}';`
          : `UPDATE "${tableName}" SET "${columnName}" = ${newValue} WHERE user_id = '${user_id}' AND area_id = ${area_id};`;
    }
    const result = await db.result(query);

    if (result.rowCount === 1) {
      console.log(`Value updated successfully for ID ${user_id}`);
      return true;
    } else {
      console.log(`No rows were updated for ID ${user_id}`);
      return false;
    }
  } catch (error) {
    console.error('Error updating value:', error);
    return false;
  }
}

export { UpdateData };
