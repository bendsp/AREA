import { Injectable, Logger } from '@nestjs/common';
import { ClientData, SelectAreaData } from './client.interface';
import { Status } from 'src/main';
import { insertData, insertUser } from 'src/db/db.insertData';
import { selectData } from 'src/db/db.selectData';
import { UpdateData } from 'src/db/db.updateData';
import { Area, AreaData, User } from 'src/db/db.interface';
import { SelectTimeData, TimeData } from 'src/time/time.interface';
import { SelectEmailData } from 'src/mailing/mailing.interface';

@Injectable()
export class ClientService {

    public async getAllNodes(id: number): Promise<ClientData[]> {
        let result: ClientData[] = [];
        const timeResults = await selectData("Time", id) as SelectTimeData[];
        const emailResults = await selectData("Gmail", id) as SelectEmailData[];
        const areaResults = await selectData("Area", id) as SelectAreaData[];

        areaResults.forEach((area:AreaData) => {
            result.push({
                user_id: id,
                area_id: area.area_id,
                area_name: area.area_name,
                action:{serviceName: "", body: {}},
                reaction:[]
            });
        })
        timeResults.forEach(async (user:any) => {
            result.forEach((area) => {
                if (Number(area.area_id) === Number(user.area_id)) {
                    area.action = {serviceName: "Time", body: {time: user.time, city: user.city}};
                }
                if (Number(area.area_id) < Number(user.area_id) && Number(user.area_id) < Number(area.area_id) + 1) {
                    area.reaction.push({serviceName: "Time", body: {time: user.time, city: user.city}});
                }
            });

        });
        emailResults.forEach(async (user:any) => {
            result.forEach((area) => {
                if (Number(area.area_id) === Number(user.area_id)) {
                    area.action = {serviceName: "Gmail", body: {email: user.email, subject: user.subject, message: user.message}};
                }
                if (Number(area.area_id) < Number(user.area_id) && Number(user.area_id) < Number(area.area_id) + Number(1)) {
                    Logger.log('push');
                    area.reaction.push({serviceName: "Gmail", body: {email: user.email, subject: user.subject, message: user.message}});
                }
            });
        });
        return result;
    }

    public async newNode(body: ClientData): Promise<Status> {
        let nb_area: number = parseInt((await selectData("User", body.user_id, "nb_area") as string), 10) + 1;

        if (await insertData({user_id: body.user_id, area_id: nb_area, TablesName: "Area", value: {area_name: body.area_name}}) === false) {
            return {"statusCode": 500, "message": `Error while adding new area_name in Area`};
        }
        if (await insertData({user_id: body.user_id, area_id: nb_area, TablesName: body.action.serviceName, value: body.action.body}) === false) {
            return {"statusCode": 500, "message": `Error while adding new data in ${body.action.serviceName}`};
        }
        let i = 0;
        body.reaction.forEach(async (reaction) => {
            i = i + 0.1;
            if (await insertData({user_id: body.user_id, area_id: (nb_area + i), TablesName: reaction.serviceName, value: reaction.body}) === false) {
                return {"statusCode": 500, "message": `Error while adding new data in ${reaction.serviceName}`};
            }
        });
        if (await UpdateData(body.user_id, nb_area, "User", "nb_area") === false) {
            return {"statusCode": 500, "message": `Error while updating new nb_area in ${body.user_id}`};
        }
        return {"statusCode": 200, "message": "New node added"};
    }

    public async newUser(body: User): Promise<Status> {
        if (await insertUser(body.user_id, body.email, body.username) === false) {
            return {"statusCode": 500, "message": `Error while adding new user ${body.user_id}`};
        }
        return {"statusCode": 200, "message": "New user added"};
    }

    public async getUser(id: number): Promise<User> {
        const user = await selectData("User", id) as User[];
        if (user.length === 0) {
            return {"user_id": "r", "email": "", "username": "", "nb_area": 0};
        }
        return user[0];
    }

}
