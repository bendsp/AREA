import { Injectable, Logger } from '@nestjs/common';
import { ClientData } from './client.interface';
import { Status } from 'src/main';
import { insertData, insertUser } from 'src/db/db.insertData';
import {selectRow, selectRows, selectData} from 'src/db/db.selectData';
import { UpdateData } from 'src/db/db.updateData';
import { SelectAreaData, User } from 'src/db/db.interface';
import { deleteData } from 'src/db/db.deleteData';
@Injectable()
export class ClientService {

    public async getAllNodes(id: string): Promise<ClientData[]> {
        let result: ClientData[] = [];
        const timeResults = await selectRows("Time", id);
        const emailResults = await selectRows("Gmail", id);
        const randomPokemonResults = await selectRows("SendRandomPokemon", id);
        const areaResults = await selectRows("Area", id);
        
        areaResults.forEach((area:SelectAreaData) => {
            result.push({
                user_id: id,
                area_id: area.area_id,
                area_name: area.area_name,
                action:{serviceName: "", body: {}},
                reaction:[]
            });
        })
        randomPokemonResults.forEach(async (user:any) => {
            result.forEach((area) => {
                if (Number(area.area_id) === Number(user.area_id)) {
                    area.action = {serviceName: "SendRandomPokemon", body: {email: user.email, subject: user.subject, message: user.message}};
                }
                if (Number(area.area_id) < Number(user.area_id) && Number(user.area_id) < Number(area.area_id) + 1) {
                    area.reaction.push({serviceName: "SendRandomPokemon", body: {email: user.email, subject: user.subject, message: user.message}});
                }
            });
        });
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
        let nb_area: number = parseInt((await selectRow("User", "nb_area", body.user_id)), 10) + 1;
        Logger.log('nb_area :'+nb_area);
        if (await insertData({user_id: body.user_id, area_id: nb_area, TablesName: "Area", value: {area_name: body.area_name, nb_reaction: body.reaction.length}}) === false) {
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
        if (await UpdateData(body.user_id, nb_area, "User", 'nb_area') === false) {
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

    public async getUser(id: string): Promise<User> {
        const user = await selectRows("User", id);
        if (user.length === 0) {
            return {"user_id": "0", "email": "", "username": "", "nb_area": 0};
        }
        return user[0];
    }

    public async deleteNode(id: string, area_id: number): Promise<Status> {
        let nb_reaction:number = 0;
        selectRows("Area", id)
        .then(async (area) => {
            area.forEach(async (area) => {
                Logger.log('area.area_id : ' + area.area_id + ' area_id : ' + area_id);
                if (area.area_id == area_id) {
                    Logger.log("nb_reaction : " + area.nb_reaction);
                    nb_reaction = area.nb_reaction;
                }
            })
            Logger.log('nb_reaction : ' + nb_reaction);
            deleteData({user_id: id, area_id: area_id, TablesName: "Area"});
            deleteData({user_id: id, area_id: area_id, TablesName: "Time"});
            // deleteData({user_id: id, area_id: area_id, TablesName: "Gmail"});
        })
        .catch((err) => {
            Logger.log(err);
        })

        return {"statusCode": 200, "message": "Node deleted"};
    }

}
