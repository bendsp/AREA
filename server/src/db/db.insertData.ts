import { Logger } from '@nestjs/common';
import { PutData } from './db.interface';
import { db } from './db.setup';

function setQuery(data: PutData): string {
    let query = `INSERT INTO "${data.TablesName}" (user_id, area_id`;
    const keys = Object.keys(data.value);
    keys.forEach((key) => {
        query += `, ${key}`;
    });
    query += ') VALUES ($1, $2';
    for (let i = 0; i < keys.length; i++) {
        query += `, $${i + 3}`;
    }
    query += ');';
    return query;
}

function setValues(data: PutData): any[] {
    const dataList = [data.user_id, data.area_id];
    const values = Object.values(data.value);
    values.forEach((value) => {
        dataList.push(value);
    });
    return dataList;
}

async function insertData(data: PutData): Promise<boolean> {
    try {
        const query = setQuery(data);
        const dataList = setValues(data);
        Logger.log(query);
        Logger.log(dataList);
        await db.none(query, dataList);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function insertUser(user_id: string, email: string, username: string, nb_area: number = 0): Promise<boolean> {
    try {
        await db.none('INSERT INTO "User" (user_id, email, username, nb_area) VALUES ($1, $2, $3, $4);', [user_id, email, username, nb_area]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { insertData, insertUser };